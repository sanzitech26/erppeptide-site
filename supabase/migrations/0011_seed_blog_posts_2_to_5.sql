-- Run this in the Supabase SQL editor (after 0008_blog_posts.sql).
-- Adds blog posts 2-5. Safe to re-run: each is skipped if its slug already exists.

insert into public.blog_posts (slug, title, excerpt, content, meta_description, published)
values (
  'choosing-the-right-peptide-synthesis-strategy-late-stage-development-manufacturing',
  'Choosing the Right Peptide Synthesis Strategy for Late-Stage Development and Manufacturing',
  'SPPS, LPPS or hybrid synthesis? How the manufacturing strategy you pick affects cost, timelines, purity and supply reliability as peptide programs near commercialization.',
  $post$*By Andrew Kennedy, PhD. Shared by [jayceypeptides.com](https://jayceypeptides.com).*

## What This Means for You

- Your synthesis strategy directly impacts commercialization success, which includes cost, timelines and supply reliability.
- SPPS alone may introduce risk at scale, with declining yield, higher solvent use and potential batch failure.
- LPPS improves efficiency and purity, but is limited in handling longer or more complex peptides.
- Hybrid synthesis provides flexibility, allowing you to optimize each step based on molecule complexity.

As peptide therapeutics advance toward late-stage development and commercialization, manufacturing strategies play an important role in the overall program success. What works in early development does not always translate for peptide therapies that are in later stages of development.

For late-stage programs, priorities shift to scalability, yield, timelines, cost and purity. Selecting the right synthesis approach is no longer a technical decision, but a strategic one.

Three primary approaches dominate peptide manufacturing today: solid-phase peptide synthesis (SPPS), liquid-phase peptide synthesis (LPPS), and hybrid synthesis. Each offers distinct advantages and limitations.

## Solid Phase Peptide Synthesis (SPPS)

SPPS is one of the most common approaches for long peptide fragments. It is valued for its reliability, speed and compatibility with automation. However, as peptide length increases, several challenges emerge:

- As the peptide chain grows, coupling issues can lead to declining quality and yield of the crude
- Large volumes of reagents and solvents are required
- Risk of full batch failure
- High process mass intensity (PMI)

For late-stage and commercial production, these factors can significantly impact cost, sustainability and reliability.

## Liquid Phase Peptide Synthesis (LPPS)

LPPS offers an alternative for shorter fragments. Key advantages include:

- Lower reagent stoichiometry and reduced solvent usage
- Cleaner crude impurity profiles
- Ability to isolate intermediates, reducing risk at each step

However, LPPS is not universally applicable:

- Not suitable for long peptides or long fragments
- Fragment length limitations restrict flexibility
- Requires molecule-specific optimization

These constraints can limit its use as a standalone solution for more complex or longer peptides.

## Hybrid Synthesis

Rather than choosing between SPPS and LPPS, hybrid synthesis combines the strengths of both in order to optimize purity, yield and cost.

In this approach, SPPS is used to generate peptide fragments, and LPPS is used to assemble the fragments. This enables:

- Improved crude purity and yield by reducing cumulative coupling inefficiencies
- Reduced solvent usage compared to SPPS alone
- Opportunity to use greener, more sustainable solvents during synthesis
- The ability to isolate and manage synthesis challenges at the fragment level
- Greater flexibility in process design based on molecule complexity
- Shorter timelines when fragments are synthesized in parallel

For late-stage programs, hybrid synthesis offers a balanced option that supports manufacturing needs and lifecycle optimization.

## Why Hybrid is the Best Fit for Late-Stage Programs

As programs move toward commercialization, a more flexible approach becomes increasingly important. Rather than relying on a single synthesis platform, an approach that uses the strengths of both SPPS and LPPS may be the better option. Hybrid synthesis can offset the challenges of each, improving efficiency, yield, cost and scalability.

For pharmaceutical companies navigating these decisions, understanding the differences between the strategies can help identify the right path forward, and ultimately help bring important therapies to patients faster and more reliably.

---

Explore our peptide catalog at [jayceypeptides.com](https://jayceypeptides.com/products).
$post$,
  'Compare SPPS, LPPS and hybrid peptide synthesis for late-stage development: effects on cost, yield, purity, timelines and scalability.',
  true
)
on conflict (slug) do nothing;

insert into public.blog_posts (slug, title, excerpt, content, meta_description, published)
values (
  'peptide-vaccines-in-canine-veterinary-medicine',
  'Peptide Vaccines in Canine Veterinary Medicine',
  'Peptide vaccines under study in dogs: an EGFR/HER2 cancer immunotherapy, a frameshift-peptide preventative cancer vaccine, and a concept vaccine for canine distemper virus.',
  $post$*Shared by [jayceypeptides.com](https://jayceypeptides.com).*

Several peptide vaccine therapies are being studied in dogs. Much like in humans, cancer is often devastating in canines and other domesticated animals.

## EGFR/HER2 cancer immunotherapy

In a number of cancers, epidermal growth factor receptor (EGFR) and human epidermal growth factor receptor-2 (HER2) proteins are overexpressed and stimulate cancer cell growth in both canines and humans. Moreover, current monoclonal antibody therapies fail to produce long-lasting immunity.

A new cancer immunotherapy for dogs is being developed by researchers at Yale University and is being evaluated in a study led by Therajan LLC. The EGFR/HER2 vaccine stimulates the production of anti-EGFR/HER2 antibodies, which suppress EGFR/HER2 protein overexpression, resulting in decreased cancer cell growth. In addition, the vaccine holds promise when used in conjunction with other forms of cancer therapy, including radiation, chemotherapy or checkpoint inhibition. Of 300 dogs being tested, survival rate was found to double from 35% to 65% when given the vaccine [1, 2, 3].

## Frameshift peptides as a preventative cancer vaccine

In another cancer vaccine, frameshift peptides are being used in a preventative vaccine for dogs by Calviri, Inc. In uncontrolled, rapid tumor cell growth, there are often several errors in RNA transcription. These coding errors generate frameshift peptides. This cancer vaccine uses these frameshift peptides, which are tumor-specific neoantigens, as immunization against these cancers, since they are strongly recognized by the immune system [4, 5].

## A peptide vaccine for canine distemper virus

Another conceptualized peptide vaccine is one against a newer strain of canine distemper virus (CDV). Canine distemper (CD) is highly contagious and causes respiratory, digestive, skin and neurological symptoms in dogs and other mammals. While distemper vaccines exist, they were developed against an ancestral strain which no longer circulates, so an updated vaccine is needed. In theory, a vaccine comprised of single CDV peptides and multiepitope CDV polypeptides may be effective in preventing CDV infection in domestic and wild animals [6].

## References

1. Doyle HA, et al. Vaccine-induced ErbB (EGFR/HER2)-specific immunity in spontaneous canine cancer. *Transl Oncol*. 2021 Nov;14(11):101205. doi: 10.1016/j.tranon.2021.101205. PMID: 34419682; PMCID: PMC8379704. [https://pmc.ncbi.nlm.nih.gov/articles/PMC8379704/](https://pmc.ncbi.nlm.nih.gov/articles/PMC8379704/)
2. EGFR/HER2 Vaccine Study Status. (30 October 2024). Canine Cancer Alliance. [https://www.ccralliance.org/yale-status](https://www.ccralliance.org/yale-status)
3. Uribe ML, Marrocco I, Yarden Y. EGFR in Cancer: Signaling Mechanisms, Drugs, and Acquired Resistance. *Cancers*. 2021; 13(11):2748. [https://doi.org/10.3390/cancers13112748](https://doi.org/10.3390/cancers13112748)
4. Our Science. (4 November 2024). Calviri. [https://www.calviri.com/our-science](https://www.calviri.com/our-science)
5. Burton JH, et al. Design of a randomized, placebo-controlled study evaluating efficacy and safety of a cancer preventative vaccine in dogs. *Veterinary Immunology and Immunopathology*, 2024, 267: 110691. [https://doi.org/10.1016/j.vetimm.2023.110691](https://doi.org/10.1016/j.vetimm.2023.110691)
6. Rendon-Marin S, Ruíz-Saenz J. Universal peptide-based potential vaccine design against canine distemper virus (CDV) using a vaccinomic approach. *Sci Rep*. 2024 Jul 18;14(1):16605. doi: 10.1038/s41598-024-67781-5. PMID: 39026076; PMCID: PMC11258135. [https://pmc.ncbi.nlm.nih.gov/articles/PMC11258135/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11258135/)

---

Explore our peptide catalog at [jayceypeptides.com](https://jayceypeptides.com/products).
$post$,
  'Peptide vaccines being studied in dogs: EGFR/HER2 cancer immunotherapy, frameshift-peptide cancer prevention, and a concept vaccine for canine distemper.',
  true
)
on conflict (slug) do nothing;

insert into public.blog_posts (slug, title, excerpt, content, meta_description, published)
values (
  'treating-rare-diseases-with-peptides',
  'Treating Rare Diseases with Peptides',
  'Why peptides suit rare disease treatment, the incentives behind orphan drugs, and a look at peptides in clinical development and already approved for rare conditions.',
  $post$*First posted February 28, 2023, updated February 26, 2025. Shared by [jayceypeptides.com](https://jayceypeptides.com).*

Rare Disease Day® takes place in late February every year and was created to raise awareness to bring about change. A disease is categorized as a rare disease if it affects fewer than 1 in 2000 people. Around 70% of rare diseases begin in childhood and nearly 1 in 5 are cancers [1]. There are over 7,000 known rare diseases, many of which are fatal.

Because so few people are affected by a given rare disease, there often is not much attention, research or funding for them. In the US, the Orphan Drug Act was signed into law in 1983 and incentivizes development of drugs for rare diseases through tax breaks, user fee waivers and market exclusivity incentives. In addition, the US FDA has grants available for funding of rare disease research [2], and in 2022 the Center for Drug Evaluation and Research (CDER) launched the Accelerating Rare disease Cures (ARC) Program to speed up development of treatments for rare diseases [3].

## Why peptides?

Peptides by nature have several advantages as options to treat and detect disease, including cell permeability, receptor binding and tumor targeting.

## Peptides in clinical development for rare diseases

- A PTH analog for treating hypoparathyroidism [4]
- Insulin-like growth factor binding protein 2 (IGFBP2) peptide for regulating fat and glucose metabolism [4]
- A peptide vaccine targeting CMV antigen for the treatment of newly diagnosed pediatric high-grade glioma [5]
- A peptide for improving treatment of degenerative retinal diseases
- A broad-spectrum antibiotic peptide for the treatment of prosthetic joint infections (PJI) [6]
- Rusfertide, a hepcidin mimetic for treating iron overload, such as polycythemia vera [7]

## Select approved drugs for rare diseases

- **Ziconotide**, derived from the sea snail venom ω-conotoxin, interferes with pain signals and was approved for alleviating long-term pain
- **Afamelanotide**, for prevention of phototoxicity in adults with erythropoietic protoporphyria
- **Carfilzomib**, for multiple myeloma in adults
- **Ciclosporin**, for severe vernal keratoconjunctivitis in children over 4 years and adolescents
- **Lutetium Lu 177 dotatate**, to treat somatostatin receptor positive gastroenteropancreatic neuroendocrine tumors
- **Pasireotide**, for acromegaly and Cushing's disease
- **Teduglutide**, a GLP-2 analog that promotes mucosal growth, for short bowel syndrome

## References

1. [https://www.rarediseaseday.org/](https://www.rarediseaseday.org/)
2. [https://www.fda.gov/patients/rare-diseases-fda](https://www.fda.gov/patients/rare-diseases-fda)
3. [https://www.fda.gov/drugs/drug-safety-and-availability/cder-launches-new-accelerating-rare-disease-cures-arc-program](https://www.fda.gov/drugs/drug-safety-and-availability/cder-launches-new-accelerating-rare-disease-cures-arc-program)
4. [https://globalgenes.org/raredaily/amolyt-aspires-to-be-a-leading-rare-disease-company/](https://globalgenes.org/raredaily/amolyt-aspires-to-be-a-leading-rare-disease-company/)
5. [https://www.fda.gov/news-events/press-announcements/fda-awards-11-grants-clinical-trials-develop-new-medical-products-rare-disease-treatments](https://www.fda.gov/news-events/press-announcements/fda-awards-11-grants-clinical-trials-develop-new-medical-products-rare-disease-treatments)
6. [https://www.prnewswire.com/news-releases/peptilogics-receives-fda-orphan-drug-designation-for-novel-peptide-therapy-for-the-treatment-of-prosthetic-joint-infections-301126142.html](https://www.prnewswire.com/news-releases/peptilogics-receives-fda-orphan-drug-designation-for-novel-peptide-therapy-for-the-treatment-of-prosthetic-joint-infections-301126142.html)
7. [https://www.protagonist-inc.com/our-science/product-candidates/default.aspx](https://www.protagonist-inc.com/our-science/product-candidates/default.aspx)

---

Explore our peptide catalog at [jayceypeptides.com](https://jayceypeptides.com/products).
$post$,
  'How peptides are being used to treat rare diseases: orphan drug incentives, peptides in clinical development, and approved peptide drugs.',
  true
)
on conflict (slug) do nothing;

insert into public.blog_posts (slug, title, excerpt, content, meta_description, published)
values (
  'hybrid-synthesis-is-redefining-peptide-manufacturing',
  'Hybrid Synthesis is Redefining Peptide Manufacturing',
  'Brian Gregg, CEO of AmbioPharm, on why hybrid peptide synthesis is becoming the defining manufacturing advantage in the GLP-1 era.',
  $post$*Shared by [jayceypeptides.com](https://jayceypeptides.com).*

> "Drug candidates that previously would not have been considered feasible — they're now on the table. Hybrid synthesis is opening the door to peptide drugs you're going to need in larger quantities."

Brian Gregg, CEO of AmbioPharm, has spent his career in the peptide contract development and manufacturing organization (CDMO) industry, including early work on exenatide, the first approved GLP-1 receptor agonist for Type 2 diabetes. Today, he leads AmbioPharm through a period of significant strategic expansion, anchored by a differentiated capability: hybrid peptide synthesis.

In this episode of the PharmaSource podcast, Brian explains why hybrid synthesis is rapidly becoming the defining manufacturing advantage in the GLP-1 era, how AmbioPharm is building mirror-image facilities in Shanghai and South Carolina to de-risk customer supply chains, and why the company's dual-continent footprint is an asset.

---

Explore our peptide catalog at [jayceypeptides.com](https://jayceypeptides.com/products).
$post$,
  'Why hybrid peptide synthesis is becoming a defining manufacturing advantage in the GLP-1 era, with insights from AmbioPharm CEO Brian Gregg.',
  true
)
on conflict (slug) do nothing;
