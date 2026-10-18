
import pool from "@/lib/db";

// Temporary type until your teammate's fairness PR is merged
interface Participant {
  id: string;
  name: string;
  timezone: string;
  preferredStart: string;
  preferredEnd: string;
  historicalInconvenience: number;
}

export async function getGroupParticipants(
  groupId: string
): Promise<Participant[]> {
  const result = await pool.query(
    `
    SELECT
      u.id,
      u.name,
      p.timezone,
      TO_CHAR(p.preferred_start, 'HH24:MI') AS "preferredStart",
      TO_CHAR(p.preferred_end, 'HH24:MI') AS "preferredEnd",
      COALESCE(f.historical_inconvenience, 0)
        AS "historicalInconvenience"
    FROM group_members gm
    JOIN users u
      ON u.id = gm.user_id
    LEFT JOIN user_preferences p
      ON p.user_id = u.id
    LEFT JOIN fairness_balances f
      ON f.user_id = gm.user_id
      AND f.group_id = gm.group_id
    WHERE gm.group_id = $1
    ORDER BY u.name
    `,
    [groupId]
  );

  return result.rows.map((row) => ({
    ...row,
    timezone: row.timezone ?? "Europe/London",
    preferredStart: row.preferredStart ?? "09:00",
    preferredEnd: row.preferredEnd ?? "17:00",
    historicalInconvenience: Number(
      row.historicalInconvenience
    ),
  }));
}
