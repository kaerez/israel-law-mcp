/**
 * Response metadata utilities for Israel Law MCP.
 */

import type Database from '@ansvar/mcp-sqlite';

export interface Meta {
  data_source: string;
  jurisdiction: string;
  disclaimer: string;
  copyright: string;
  data_age?: string;
  note?: string;
  query_strategy?: string;
}

/** @deprecated Use Meta instead */
export type ResponseMetadata = Meta;

export interface ToolResponse<T> {
  results: T;
  _meta: Meta;
  _citation?: import('./citation.js').CitationMetadata;
  _error_type?: string;
}

export function generateResponseMetadata(
  db: InstanceType<typeof Database>,
): Meta {
  let data_age: string | undefined;
  try {
    const row = db.prepare(
      "SELECT value FROM db_metadata WHERE key = 'built_at'"
    ).get() as { value: string } | undefined;
    if (row) data_age = row.value.slice(0, 10);
  } catch {
    // Ignore
  }

  return {
    data_source: 'Knesset Legislation Database (knesset.gov.il) + gov.il English translations',
    jurisdiction: 'IL',
    disclaimer:
      'This data is sourced from the Knesset Legislation Database and Israeli government publications. ' +
      'Hebrew is the legally authoritative language. English translations are unofficial. ' +
      'Always verify with the official Knesset or Nevo portals.',
    copyright: 'Knesset of Israel / Government of Israel',
    data_age,
  };
}
