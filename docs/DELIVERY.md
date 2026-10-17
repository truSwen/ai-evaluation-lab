# Delivery and publication record

Recorded on **17 October 2026**. This record distinguishes implementation, validation, hosting and portfolio publication. A scheduled social post is not a published post.

## AI Evaluation Lab

- **Source:** [truSwen/ai-evaluation-lab](https://github.com/truSwen/ai-evaluation-lab)
- **Live demo:** [tribloc-ai-evaluation.pages.dev](https://tribloc-ai-evaluation.pages.dev/)
- **Validated implementation commit:** `377d42e142fee73cf1ab6c325deff3acffde7148`
- **Hosting:** deployed to a separate Cloudflare Pages project. Local execution is optional.
- **Contra:** content and screenshot were entered into a new project form; final publication was not completed. There is no verified public project URL for this demo.
- **LinkedIn:** saved in the native scheduled-post list for **21 October 2026, 09:00 Europe/Budapest (UTC+02:00)**. The reopened list displayed “Posting Wed, Oct 21, 2026 at 9:00 AM” alongside the Evaluation Lab text, live demo URL and source URL. Publication itself is still future and has not been verified.

Further portfolio editing was stopped at the owner's request. The unfinished Contra form is not a durable publication or a guarantee that the service will preserve the draft.

## Validation evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Automated engine tests | 39 passed, 0 failed | [Test report](test-report.txt) |
| Local browser scenarios | 10 passed | [Recorded browser checks](browser-checks.json) |
| Deployed browser scenarios | 4 passed | [Recorded hosted checks](hosted-checks.json) |
| Example evaluation reports | Recorded for reproducibility | [Sample results](sample-results.json) |
| UI screenshot | Actual synthetic demo | [Screenshot](demo.png) |

The checks cover expected confusion counts, explicit denominators, threshold boundaries, missing labels, cutoff/window eligibility, class imbalance, undefined metrics, deterministic fingerprints and invalid inputs. Local browser checks also cover error filtering and reload defaults. The four deployed checks cover a higher threshold, a later cutoff, no eligible labels and class imbalance.

These are bounded software checks, not a model benchmark, a security certification or evidence of real-world predictive performance. This documentation update does not change executable code and does not represent a new test run.

## Public-data boundary and limitations

All predictions, scores, labels, dates and record identifiers are invented. The sample is independently implemented and contains no customer records, credentials, private project code or proprietary architecture. No model is trained or called, and no actual client or model results are claimed.

Evaluation calculations run in the visitor's browser. No evaluation records are sent to a backend; the demo state resets on reload. Zero-denominator metrics remain undefined. The majority-class reference describes the scored fixture's label distribution; it is not a separately trained baseline. There is no holdout study, confidence interval or generalization claim.

Architecture, scope and acceptance direction: **Benjamin Zsigri**. Implementation assisted by AI.

## Related public synthetic demos

The following four demos were already hosted and their Contra completed-work links were reopened and checked during the preceding delivery. These links are a dated record, not ongoing monitoring.

| Demo | Live site | Source | Contra |
| --- | --- | --- | --- |
| Evidence-gated workflow | [Open demo](https://tribloc-evidence-workflow.pages.dev/) | [GitHub](https://github.com/truSwen/evidence-gated-workflow-demo) | [Portfolio](https://contra.com/p/oZZOMZON-evidence-gated-workflow-or-synthetic-data-demo) |
| MCP evidence tools | [Open demo](https://tribloc-mcp-tools.pages.dev/) | [GitHub](https://github.com/truSwen/synthetic-mcp-tool-demo) | [Portfolio](https://contra.com/p/ANrRLZqk-mcp-evidence-tools-or-synthetic-data-demo) |
| AI usage and cost explorer | [Open demo](https://tribloc-ai-costs.pages.dev/) | [GitHub](https://github.com/truSwen/ai-usage-cost-explorer) | [Portfolio](https://contra.com/p/7gMebgbY-ai-usage-and-cost-explorer-or-synthetic-demo) |
| Conflicting evidence explorer | [Open demo](https://tribloc-evidence-conflicts.pages.dev/) | [GitHub](https://github.com/truSwen/conflicting-evidence-explorer) | [Portfolio](https://contra.com/p/Bv727g7c-conflicting-evidence-explorer-or-synthetic-demo) |

The native LinkedIn schedule was reopened on 17 October and showed the MCP, cost and conflict posts respectively on **18, 19 and 20 October 2026 at 09:00**, followed by Evaluation Lab on **21 October at 09:00**. The previously saved MCP and cost posts still describe their original locally runnable versions; their GitHub repositories also link to the subsequent hosted demos. Those older post texts were not revised during this documentation handoff.
