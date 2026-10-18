
import pool from "@/lib/db";

export interface Group {
  id: string;
  name: string;
  createdAt: Date;
}

export async function createGroup(
  name: string
): Promise<Group> {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Group name cannot be empty");
  }

  if (trimmedName.length > 100) {
    throw new Error("Group name must be 100 characters or fewer");
  }

  const result = await pool.query(
    `
    INSERT INTO groups (name)
    VALUES ($1)
    RETURNING
      id,
      name,
      created_at AS "createdAt"
    `,
    [trimmedName]
  );

  return result.rows[0] as Group;
}





export async function addGroupMember(
  groupId: string,
  userId: string
): Promise<boolean> {
  const result = await pool.query(
    `
    INSERT INTO group_members (group_id, user_id)
    VALUES ($1, $2)
    ON CONFLICT (group_id, user_id) DO NOTHING
    RETURNING user_id
    `,
    [groupId, userId]
  );

  return result.rows.length > 0;
}





export async function createGroupWithCreator(
  name: string,
  creatorId: string
): Promise<Group> {
  const trimmedName = name.trim();

  if (!trimmedName || trimmedName.length > 100) {
    throw new Error("Group name must be 1–100 characters");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Create the group
    const groupResult = await client.query(
      `
      INSERT INTO groups (name)
      VALUES ($1)
      RETURNING
        id,
        name,
        created_at AS "createdAt"
      `,
      [trimmedName]
    );

    const group = groupResult.rows[0] as Group;

    // Add the creator as the first group member
    await client.query(
      `
      INSERT INTO group_members (group_id, user_id)
      VALUES ($1, $2)
      `,
      [group.id, creatorId]
    );

    // Save both changes together
    await client.query("COMMIT");

    return group;
  } catch (error) {
    // Undo changes if anything fails
    await client.query("ROLLBACK");
    throw error;
  } finally {
    // Return the connection to the pool
    client.release();
  }
}
