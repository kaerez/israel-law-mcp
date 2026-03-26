# Israeli Law MCP Server

**The Nevo.co.il alternative for the AI age.**

[![npm version](https://badge.fury.io/js/@ansvar%2Fisrael-law-mcp.svg)](https://www.npmjs.com/package/@ansvar/israel-law-mcp)
[![MCP Registry](https://img.shields.io/badge/MCP-Registry-blue)](https://registry.modelcontextprotocol.io)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub stars](https://img.shields.io/github/stars/Ansvar-Systems/israel-law-mcp?style=social)](https://github.com/Ansvar-Systems/israel-law-mcp)
[![CI](https://github.com/Ansvar-Systems/israel-law-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Ansvar-Systems/israel-law-mcp/actions/workflows/ci.yml)
[![Database](https://img.shields.io/badge/database-pre--built-green)](https://github.com/Ansvar-Systems/israel-law-mcp)
[![Provisions](https://img.shields.io/badge/provisions-537-blue)](https://github.com/Ansvar-Systems/israel-law-mcp)

Query **66 Israeli statutes** -- from the Privacy Protection Law and Data Security Regulations to the Penal Law, Companies Law, and Electronic Signature Law -- directly from Claude, Cursor, or any MCP-compatible client.

If you're building legal tech, compliance tools, or doing Israeli legal research, this is your verified reference database.

Built by [Ansvar Systems](https://ansvar.eu) -- Stockholm, Sweden

---

## Why This Exists

Israeli legal research spans Knesset publications, Nevo.co.il, laws.gov.il (מאגר החקיקה הלאומי), and official Reshumot gazette entries. Whether you're:

- A **lawyer** validating citations in a brief or contract
- A **compliance officer** checking Privacy Protection Law obligations or Data Security Regulation requirements
- A **legal tech developer** building tools on Israeli law
- A **researcher** tracing provisions across Knesset statutes

...you shouldn't need dozens of browser tabs and manual cross-referencing. Ask Claude. Get the exact provision. With context.

This MCP server makes Israeli law **searchable, cross-referenceable, and AI-readable**.

---

## Quick Start

### Use Remotely (No Install Needed)

> Connect directly to the hosted version -- zero dependencies, nothing to install.

**Endpoint:** `https://mcp.ansvar.eu/law-israel-law-mcp/mcp`

| Client | How to Connect |
|--------|---------------|
| **Claude.ai** | Settings > Connectors > Add Integration > paste URL |
| **Claude Code** | `claude mcp add israeli-law --transport http https://mcp.ansvar.eu/law-israel-law-mcp/mcp` |
| **Claude Desktop** | Add to config (see below) |
| **GitHub Copilot** | Add to VS Code settings (see below) |

**Claude Desktop** -- add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "israeli-law": {
      "type": "url",
      "url": "https://mcp.ansvar.eu/law-israel-law-mcp/mcp"
    }
  }
}
```

**GitHub Copilot** -- add to VS Code `settings.json`:

```json
{
  "github.copilot.chat.mcp.servers": {
    "israeli-law": {
      "type": "http",
      "url": "https://mcp.ansvar.eu/law-israel-law-mcp/mcp"
    }
  }
}
```

### Use Locally (npm)

```bash
npx @ansvar/israel-law-mcp
```

**Claude Desktop** -- add to `claude_desktop_config.json`:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "israeli-law": {
      "command": "npx",
      "args": ["-y", "@ansvar/israel-law-mcp"]
    }
  }
}
```

**Cursor / VS Code:**

```json
{
  "mcp.servers": {
    "israeli-law": {
      "command": "npx",
      "args": ["-y", "@ansvar/israel-law-mcp"]
    }
  }
}
```

---

## Example Queries

Once connected, just ask naturally:

- *"חיפוש הוראות בנושא 'הגנת הפרטיות' בחוק הגנת הפרטיות"* (Search provisions on "privacy protection")
- *"מה אומר חוק העונשין לגבי עבירות מחשב?"* (What does the Penal Law say about computer offenses?)
- *"מצא סעיפים בחוק החוזים העוסקים בתנאים מקפחים"* (Find provisions in the Contracts Law on unfair terms)
- *"מה דורש חוק הגנת הצרכן לגבי גילוי מידע?"* (What does the Consumer Protection Law require on disclosure?)
- *"Is the Privacy Protection Law still in force?"*
- *"Find provisions about data breach notification in Israeli law"*
- *"What EU laws align with the Israeli Privacy Protection Law?"*
- *"Validate the citation Privacy Protection Law, 5741-1981, Section 7"*
- *"Build a legal stance on data security requirements under Israeli regulations"*

---

## What's Included

| Category | Count | Details |
|----------|-------|---------|
| **Statutes** | 66 laws | Privacy, data security, computer law, companies, electronic signatures, credit data |
| **Provisions** | 537 sections | Full-text searchable with FTS5 |
| **EU Cross-References** | Linked | GDPR adequacy relationships and comparative alignment |
| **Database Size** | Optimized SQLite | Portable, pre-built |
| **Data Source** | main.knesset.gov.il | Official Knesset legislation database |

**Verified data only** -- every citation is validated against official sources (Knesset, laws.gov.il). Zero LLM-generated content.

---

## Why This Works

**Verbatim Source Text (No LLM Processing):**
- All statute text is ingested from main.knesset.gov.il (מאגר החקיקה הלאומי) and official Knesset publications
- Provisions are returned **unchanged** from SQLite FTS5 database rows
- Zero LLM summarization or paraphrasing -- the database contains statute text, not AI interpretations

**Smart Context Management:**
- Search returns ranked provisions with BM25 scoring (safe for context)
- Provision retrieval gives exact text by statute name + section number
- Cross-references help navigate without loading everything at once

**Technical Architecture:**
```
Knesset API / laws.gov.il --> Parse --> SQLite --> FTS5 snippet() --> MCP response
                                ^                        ^
                         Provision parser         Verbatim database query
```

### Traditional Research vs. This MCP

| Traditional Approach | This MCP Server |
|---------------------|-----------------|
| Search Nevo.co.il or laws.gov.il by statute name | Search in Hebrew or English: *"הגנת הפרטיות נתונים"* |
| Navigate multi-section statutes manually | Get the exact provision with context |
| Manual cross-referencing between laws | `build_legal_stance` aggregates across sources |
| "Is this statute still in force?" -- check manually | `check_currency` tool -- answer in seconds |
| Find EU basis -- dig through EUR-Lex | `get_eu_basis` -- linked EU alignment instantly |
| No API, no integration | MCP protocol -- AI-native |

**Traditional:** Search Nevo.co.il --> Navigate Hebrew/English statute --> Ctrl+F --> Cross-reference between laws --> Check EUR-Lex for GDPR adequacy --> Repeat

**This MCP:** *"What are the data breach notification requirements under Israeli law and how do they compare to GDPR Article 33?"* --> Done.

---

## Available Tools (13)

### Core Legal Research Tools (8)

| Tool | Description |
|------|-------------|
| `search_legislation` | FTS5 full-text search across 537 provisions with BM25 ranking. Supports Hebrew and English queries, quoted phrases, boolean operators |
| `get_provision` | Retrieve specific provision by statute name + section number |
| `check_currency` | Check if a statute is in force, amended, or repealed |
| `validate_citation` | Validate citation against database -- zero-hallucination check |
| `build_legal_stance` | Aggregate citations from multiple statutes for a legal topic |
| `format_citation` | Format citations per Israeli legal conventions |
| `list_sources` | List all available statutes with metadata and coverage scope |
| `about` | Server info, capabilities, dataset statistics, and coverage summary |

### EU Law Integration Tools (5)

| Tool | Description |
|------|-------------|
| `get_eu_basis` | Get EU directives/regulations that an Israeli statute aligns with |
| `get_israeli_implementations` | Find Israeli laws corresponding to a specific EU act |
| `search_eu_implementations` | Search EU documents with Israeli alignment counts |
| `get_provision_eu_basis` | Get EU law references for a specific provision |
| `validate_eu_compliance` | Check alignment status of Israeli statutes against EU directives |

---

## EU Law Integration

**Israel holds EU adequacy status under GDPR Article 45** -- the European Commission has determined that Israeli law provides an essentially equivalent level of protection to that guaranteed in the EU. This makes Israel one of a small group of non-EU countries recognized as adequate for personal data transfers.

| Metric | Value |
|--------|-------|
| **GDPR Adequacy** | Yes -- Commission Decision (2011), upheld under GDPR Article 45 |
| **Key Israeli Privacy Law** | Privacy Protection Law, 5741-1981 |
| **Key Data Security Law** | Privacy Protection Regulations (Data Security), 5777-2017 |
| **Alignment Framework** | GDPR principles, ePrivacy concepts, NIS-equivalent provisions |

The EU bridge tools allow you to explore these adequacy and alignment relationships -- checking which Israeli provisions correspond to EU requirements, and tracing the legislative basis for Israel's adequacy determination.

> **Note:** EU cross-references reflect adequacy and alignment relationships. Israel operates its own independent legal system. The EU tools identify where Israeli and EU law address the same domains under comparable principles.

---

## Data Sources & Freshness

All content is sourced from authoritative Israeli legal databases:

- **[Knesset Legislation Database](https://main.knesset.gov.il)** (מאגר החקיקה הלאומי) -- Official source for all primary legislation
- **[laws.gov.il](https://laws.gov.il)** -- National legislation portal
- **[Nevo.co.il](https://nevo.co.il)** -- Cross-reference and citation validation

### Data Provenance

| Field | Value |
|-------|-------|
| **Authority** | Knesset of Israel |
| **Retrieval method** | Knesset official API and legislation portal |
| **Languages** | Hebrew (primary), English (where official translations exist) |
| **License** | Israeli Government public domain |
| **Coverage** | 66 statutes across privacy, data security, computer law, companies, and electronic transactions |

### Automated Freshness Checks

A [GitHub Actions workflow](.github/workflows/check-updates.yml) monitors data sources for changes:

| Check | Method |
|-------|--------|
| **Statute amendments** | Drift detection against known provision anchors |
| **New statutes** | Comparison against official Knesset publications |
| **Repealed statutes** | Status change detection |

**Verified data only** -- every citation is validated against official sources. Zero LLM-generated content.

---

## Security

This project uses multiple layers of automated security scanning:

| Scanner | What It Does | Schedule |
|---------|-------------|----------|
| **CodeQL** | Static analysis for security vulnerabilities | Weekly + PRs |
| **Semgrep** | SAST scanning (OWASP top 10, secrets, TypeScript) | Every push |
| **Gitleaks** | Secret detection across git history | Every push |
| **Trivy** | CVE scanning on filesystem and npm dependencies | Daily |
| **Socket.dev** | Supply chain attack detection | PRs |
| **Dependabot** | Automated dependency updates | Weekly |

See [SECURITY.md](SECURITY.md) for the full policy and vulnerability reporting.

---

## Important Disclaimers

### Legal Advice

> **THIS TOOL IS NOT LEGAL ADVICE**
>
> Statute text is sourced from the Knesset official legislation database. However:
> - This is a **research tool**, not a substitute for professional legal counsel
> - **Court case coverage is not included** -- do not rely solely on this for case law research
> - **Verify critical citations** against primary sources (Nevo.co.il, laws.gov.il) for court filings
> - **EU cross-references** reflect adequacy and alignment relationships, not transposition
> - **Hebrew-language statutes** -- English translations are not always official; verify against the Hebrew source for legal proceedings

**Before using professionally, read:** [DISCLAIMER.md](DISCLAIMER.md) | [SECURITY.md](SECURITY.md)

### Client Confidentiality

Queries go through the Claude API. For privileged or confidential matters, use on-premise deployment. For guidance on professional use, consult the **לשכת עורכי הדין בישראל** (Israel Bar Association) professional conduct rules.

---

## Development

### Setup

```bash
git clone https://github.com/Ansvar-Systems/israel-law-mcp
cd israel-law-mcp
npm install
npm run build
npm test
```

### Running Locally

```bash
npm run dev                                       # Start MCP server
npx @anthropic/mcp-inspector node dist/index.js   # Test with MCP Inspector
```

### Data Management

```bash
npm run ingest          # Ingest statutes from Knesset API
npm run build:db        # Rebuild SQLite database
npm run drift:detect    # Run drift detection against anchors
npm run check-updates   # Check for amendments and new statutes
```

### Performance

- **Search Speed:** <100ms for most FTS5 queries
- **Reliability:** 100% ingestion success rate
- **Languages:** Hebrew and English queries supported

---

## Related Projects: Complete Compliance Suite

This server is part of **Ansvar's Compliance Suite** -- MCP servers that work together for end-to-end compliance coverage:

### [@ansvar/eu-regulations-mcp](https://github.com/Ansvar-Systems/EU_compliance_MCP)
**Query 49 EU regulations directly from Claude** -- GDPR, AI Act, DORA, NIS2, MiFID II, eIDAS, and more. Full regulatory text with article-level search. `npx @ansvar/eu-regulations-mcp`

### [@ansvar/israel-law-mcp](https://github.com/Ansvar-Systems/israel-law-mcp) (This Project)
**Query 66 Israeli statutes directly from Claude** -- Privacy Protection Law, Data Security Regulations, Penal Law, Companies Law, and more. `npx @ansvar/israel-law-mcp`

### [@ansvar/us-regulations-mcp](https://github.com/Ansvar-Systems/US_Compliance_MCP)
**Query US federal and state compliance laws** -- HIPAA, CCPA, SOX, GLBA, FERPA, and more. `npx @ansvar/us-regulations-mcp`

### [@ansvar/security-controls-mcp](https://github.com/Ansvar-Systems/security-controls-mcp)
**Query 261 security frameworks** -- ISO 27001, NIST CSF, SOC 2, CIS Controls, SCF, and more. `npx @ansvar/security-controls-mcp`

**70+ national law MCPs** covering Australia, Brazil, Canada, Cameroon, Denmark, Finland, France, Germany, Ghana, India, Ireland, Netherlands, Nigeria, Norway, Singapore, Sweden, Switzerland, UAE, UK, and more.

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Priority areas:
- Statute corpus expansion (additional Knesset legislation)
- Court case law integration (Supreme Court, District Courts)
- English translation coverage for key statutes
- Amendment tracking and historical versions
- Rabbinical court decisions (where applicable to civil matters)

---

## Roadmap

- [x] Core statute database with FTS5 search
- [x] Privacy Protection Law and Data Security Regulations
- [x] EU/international law alignment tools (GDPR adequacy)
- [x] Vercel Streamable HTTP deployment
- [x] npm package publication
- [ ] Court case law expansion (Bagatz, Supreme Court)
- [ ] Full statute corpus expansion (200+ Knesset laws)
- [ ] Historical statute versions (amendment tracking)
- [ ] Hebrew-only FTS5 optimization with morphological analysis
- [ ] English translation index for major statutes

---

## Citation

If you use this MCP server in academic research:

```bibtex
@software{israeli_law_mcp_2026,
  author = {Ansvar Systems AB},
  title = {Israeli Law MCP Server: AI-Powered Legal Research Tool},
  year = {2026},
  url = {https://github.com/Ansvar-Systems/israel-law-mcp},
  note = {66 Israeli statutes with 537 provisions, EU adequacy cross-references}
}
```

---

## License

Apache License 2.0. See [LICENSE](./LICENSE) for details.

### Data Licenses

- **Statutes & Legislation:** Knesset of Israel (public domain)
- **EU Metadata:** EUR-Lex (EU public domain)

---

## About Ansvar Systems

We build AI-accelerated compliance and legal research tools for the global market. This MCP server started as our internal reference tool for Israeli law -- turns out everyone building for the Israeli market or navigating GDPR adequacy has the same research frustrations.

So we're open-sourcing it. Navigating 66 statutes across Hebrew and English shouldn't require a law degree.

**[ansvar.eu](https://ansvar.eu)** -- Stockholm, Sweden

---

<p align="center">
  <sub>Built with care in Stockholm, Sweden</sub>
</p>
