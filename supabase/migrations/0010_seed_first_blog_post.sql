-- Run this in the Supabase SQL editor (after 0008_blog_posts.sql).
-- Adds the first blog post. Safe to re-run: skipped if the slug already exists.

insert into public.blog_posts (slug, title, excerpt, content, meta_description, published)
values (
  'green-chemistry-principles-greening-solid-phase-peptide-synthesis',
  'Green Chemistry Principles, Greening Solid Phase Peptide Synthesis and Green Ethers to Precipitate Peptides After Total Cleavage',
  'A review of Green Chemistry principles, their history and advantages, and how they apply to solid phase peptide synthesis, including greener ethers for peptide precipitation.',
  $post$*A review by Fernando Albericio and Beatriz Garcia De La Torre, Peptide Sciences Laboratory, South Africa. Shared by [jayceypeptides.com](https://jayceypeptides.com).*

Solid phase peptide synthesis (SPPS) has features that fit naturally with the Green Chemistry concept. It uses a single reactor, can produce any amount of peptide you need (even low-concentration µmol scale), has no mechanical loss, needs no intermediate purification, and offers easy work-up, high yield, high purity and better purification. It also allows parallel, simultaneous synthesis under the very same conditions. Together with Green Chemistry principles, these advantages save time, energy, cost and solvents, with less impact on the environment and human health.

## Green Chemistry

Green chemistry had been practised in many chemical syntheses in the past, but the concept and definition were first developed in the 1990s as the "design of chemical products and processes to reduce or eliminate the use and generation of hazardous substances" [1, 2]. The most crucial word is *design*, since it involves new ideas and careful planning.

The twelve green chemistry principles were initiated in 1998 by Anastas and Warner and can be summarised as:

1. Waste prevention
2. Atom economy
3. Less hazardous chemical synthesis
4. Designing safer chemicals
5. Safer solvents and auxiliaries
6. Design for energy efficiency
7. Use of renewable feedstocks
8. Reduce derivatives
9. Catalysis
10. Design for degradation
11. Real-time analysis for pollution prevention
12. Inherently safer chemistry for accident prevention

These are explained further in the literature [2-5]. They act as "design rules" to follow whenever a new product is designed, produced or used, so that hazardous consequences are eliminated. The Green Chemistry ideology calls for new strategies for chemical synthesis, processing and use of chemicals that are less hazardous and safe for humans and the environment [6].

The approach has many benefits: it allows chemists to achieve sustainability, protects the environment, is good for human health and is cost-effective. Most importantly, green chemistry is well adopted across the chemistry sector, including academia, research centres and industry worldwide [6-9].

## Green Solid Phase Peptide Synthesis

The most commonly used strategy for peptide synthesis today is SPPS, pioneered in 1963 by R. Bruce Merrifield [10]. It revolutionised peptide chemistry, earned Merrifield the 1984 Nobel Prize in Chemistry, and enabled large-scale peptide production for the pharmaceutical market [10, 11].

Its features agree with the green concept: a single reactor, any scale, no mechanical loss, no intermediate purification, easy work-up, high yield and purity, parallel synthesis under identical conditions, automation, and savings in time, energy, cost and solvents [10, 12]. The solid support 2-chlorotrityl chloride (CTC) resin can also be re-used a few times with small peptides (not a universal protocol), and tBu-protected peptides are cleaved from CTC resin under mild conditions (1-2% TFA in DCM) [13, 14].

SPPS does have a major drawback that violates green chemistry: harsh acids and bases for deprotection and cleavage, hazardous solvents for resin swelling and coupling, excess washing, and purification that generates a lot of solvent waste [8].

The ideal SPPS would use no solvent, or water as the solvent. Solubility issues with some reagents make this difficult, though possible [12, 15, 16], and some sequences are hard to synthesise under such conditions. The practical alternative is to replace hazardous solvents with greener ones that still deliver excellent results.

The solvents most commonly used in SPPS (dichloromethane (DCM), N,N-dimethylformamide (DMF) and N-methylpyrrolidone (NMP)) are classified as highly hazardous in green chemistry guides [17, 18]. The authors' group has reported greener alternatives such as 2-MeTHF (2-methyltetrahydrofuran), CPME (cyclopentyl methyl ether), ethyl acetate, γ-valerolactone (GVL) and N-formylmorpholine (NFM) [19-23]. They are working not only on solvents but on greening all the chemicals and reagents used in SPPS [15, 24, 25], and are researching the poor atom economy of SPPS [26].

## Green Ethers to Precipitate Peptides

The two best-known SPPS strategies, Boc/benzyl and Fmoc/t-butyl, both rely on acidolytic cleavage to simultaneously remove protecting groups and release the peptide from the resin [27-29]. This "global deprotection" is carried out in strong acid (e.g. TFA), either alone when the peptide has no sensitive protecting groups, or with scavengers (TIS/H2O) that capture the carbocations released from the protecting groups.

Cold (-20 °C) diethyl ether (DEE) is usually used to precipitate the peptide out of the acidic solution, leaving non-volatile scavengers and non-polar protecting-group by-products in solution [30]. The precipitate is washed with cold DEE, centrifuged and collected, and this is repeated three times to remove residual scavengers [31].

Although DEE is the most widely used ether, it has a low flash point and boiling point (45 °C and 35 °C respectively, as given in the source), a low auto-ignition temperature, and is prone to forming peroxides, so it is not regarded as a green solvent [17, 32, 33].

Several ethers have been tried as replacements:

- **MTBE** (methyl tert-butyl ether) is peroxide-free, but has low solubility, a low flash point and is unstable under acidic conditions. It can also tert-butylate Met or Trp in the released peptide, especially with harsh HF or TFMSA cleavage [30].
- **2-MeTHF**, introduced by Pawlas and co-workers, can be used alone or in n-heptane mixtures and gives good peptide recovery after global deprotection [34, 35]. It is not ideal: it has a low flash point, is unstable in acid, forms peroxides easily and recovers poorly from water [36].
- **CPME** is accepted as a green precipitating ether and is free of the drawbacks above. It has favourable environmental, health and safety (EHS) properties, including a high boiling point (106 °C), stability in acidic and basic conditions, and hardly forms peroxides [32, 37, 38].

Various peptides have been precipitated with CPME with excellent results, the exception being Leu-enkephalin, which dissolved in CPME and did not precipitate. LC-MS data show no alkylation from the cyclopentyl carbocation [35, 38], consistent with Watanabe et al., who showed CPME is stable in TFA at room temperature for 8 hours [37]. CPME was also found to preserve the morphology of CTC resin beads, allowing the resin to be recycled [39].

## References

1. Horvath, I.T. and P.T. Anastas, Innovations and green chemistry. *Chemical Reviews*, 2007. 107(6): p. 2169-2173.
2. Anastas, P.T. and J.C. Warner, Principles of green chemistry. *Green Chemistry: Theory and Practice*, 1998. 29.
3. Anastas, P.T. and J.C. Warner, Green chemistry. *Frontiers*, 1998. 640: p. 1998.
4. Trost, B.M., The atom economy: a search for synthetic efficiency. *Science*, 1991. 254(5037): p. 1471-1477.
5. Sheldon, R.A., Fundamentals of green chemistry: efficiency in reaction design. *Chemical Society Reviews*, 2012. 41(4): p. 1437-1451.
6. Anastas, P.T. and T.C. Williamson, Green chemistry: an overview. 1996.
7. Anastas, P. and N. Eghbali, Green chemistry: principles and practice. *Chemical Society Reviews*, 2010. 39(1): p. 301-312.
8. Constable, D.J., et al., Key green chemistry research areas: a perspective from pharmaceutical manufacturers. *Green Chemistry*, 2007. 9(5): p. 411-420.
9. Bryan, M.C., et al., Key Green Chemistry research areas from a pharmaceutical manufacturers' perspective revisited. *Green Chemistry*, 2018. 20(22): p. 5082-5103.
10. Merrifield, R.B., Solid phase peptide synthesis. I. The synthesis of a tetrapeptide. *Journal of the American Chemical Society*, 1963. 85(14): p. 2149-2154.
11. Zompra, A.A., et al., Manufacturing peptides as active pharmaceutical ingredients. *Future Medicinal Chemistry*, 2009. 1(2): p. 361-377.
12. Jad, Y.E., et al., Green transformation of solid-phase peptide synthesis. *ACS Sustainable Chemistry & Engineering*, 2019. 7(4): p. 3671-3683.
13. García-Martín, F., et al., Chlorotrityl chloride (CTC) resin as a convenient reusable protecting group, in *Understanding Biology Using Peptides*. 2006, Springer. p. 220-221.
14. García-Martín, F., et al., Chlorotrityl chloride (CTC) resin as a reusable carboxyl protecting group. *QSAR & Combinatorial Science*, 2007. 26(10): p. 1027-1035.
15. Al Musaimi, O., G. Beatriz, and F. Albericio, Greening Fmoc/tBu solid-phase peptide synthesis. *Green Chemistry*, 2020. 22(4): p. 996-1018.
16. Sheldon, R.A., Green solvents for sustainable organic synthesis: state of the art. *Green Chemistry*, 2005. 7(5): p. 267-278.
17. Alder, C.M., et al., Updating and further expanding GSK's solvent sustainability guide. *Green Chemistry*, 2016. 18(13): p. 3879-3890.
18. Prat, D., et al., Sanofi's solvent selection guide: A step toward more sustainable processes. *Organic Process Research & Development*, 2013. 17(12): p. 1517-1525.
19. Jad, Y.E., et al., Green solid-phase peptide synthesis (GSPPS) 3. Green solvents for Fmoc removal in peptide chemistry. *Organic Process Research & Development*, 2017. 21(3): p. 365-369.
20. Jad, Y.E., et al., Green solid-phase peptide synthesis 2. 2-Methyltetrahydrofuran and ethyl acetate for solid-phase peptide synthesis under green conditions. *ACS Sustainable Chemistry & Engineering*, 2016. 4(12): p. 6809-6814.
21. Kumar, A., et al., Green solid-phase peptide synthesis 4. γ-Valerolactone and N-formylmorpholine as green solvents for solid phase peptide synthesis. *Tetrahedron Letters*, 2017. 58(30): p. 2986-2988.
22. Alhassan, M., et al., Cleaving protected peptides from 2-chlorotrityl chloride resin. Moving away from dichloromethane. *Green Chemistry*, 2020. 22(9): p. 2840-2845.
23. Jadhav, S., et al., Replacing DMF in solid-phase peptide synthesis: varying the composition of green binary solvent mixtures as a tool to mitigate common side-reactions. *Green Chemistry*, 2021. 23(9): p. 3312-3321.
24. Kumar, A., et al., Microwave-assisted green solid-phase peptide synthesis using γ-valerolactone (GVL) as solvent. *ACS Sustainable Chemistry & Engineering*, 2018. 6(6): p. 8034-8039.
25. Da'san MM, J., O. Al Musaimi, and F. Albericio, Advances in solid-phase peptide synthesis in aqueous media (ASPPS). *Green Chemistry*, 2022. 24(17): p. 6360-6372.
26. Al Musaimi, O., et al., Green circular economy applied to peptide synthesis. 2021.
27. Jaradat, D.s.M., Thirteen decades of peptide synthesis: key developments in solid phase peptide synthesis and amide bond formation utilized in peptide ligation. *Amino Acids*, 2018. 50(1): p. 39-68.
28. Fields, G.B. and R.L. Noble, Solid phase peptide synthesis utilizing 9-fluorenylmethoxycarbonyl amino acids. *International Journal of Peptide and Protein Research*, 1990. 35(3): p. 161-214.
29. Barany, G. and R. Merrifield, In The Peptides; E. Gross, J. Meienhofer, Eds. 1979, Academic Press, New York.
30. de la Torre, B.G. and D. Andreu, On choosing the right ether for peptide precipitation after acid cleavage. *Journal of Peptide Science*, 2008. 14(3): p. 360-363.
31. His, T., Cleavage, Deprotection, and Isolation of Peptides after Fmoc Synthesis. Technical Bulletin, 1998.
32. Henderson, R.K., et al., Expanding GSK's solvent selection guide: embedding sustainability into solvent selection starting at medicinal chemistry. *Green Chemistry*, 2011. 13(4): p. 854-862.
33. Prat, D., J. Hayler, and A. Wells, A survey of solvent selection guides. *Green Chemistry*, 2014. 16(10): p. 4546-4551.
34. Pawlas, J., et al., 2D green SPPS: green solvents for on-resin removal of acid sensitive protecting groups and lactamization. *Green Chemistry*, 2019. 21(10): p. 2594-2600.
35. Al Musaimi, O., et al., Greening the solid-phase peptide synthesis process. 2-MeTHF for the incorporation of the first amino acid and precipitation of peptides after global deprotection. *Organic Process Research & Development*, 2018. 22(12): p. 1809-1816.
36. Gu, Y. and F. Jerome, Bio-based solvents: an emerging generation of fluids for the design of eco-efficient processes in catalysis and organic chemistry. *Chemical Society Reviews*, 2013. 42(24): p. 9550-9570.
37. Watanabe, K., N. Yamagiwa, and Y. Torisawa, Cyclopentyl methyl ether as a new and alternative process solvent. *Organic Process Research & Development*, 2007. 11(2): p. 251-258.
38. Al Musaimi, O., et al., Investigating green ethers for the precipitation of peptides after global deprotection in solid-phase peptide synthesis. *Current Opinion in Green and Sustainable Chemistry*, 2018. 11: p. 99-103.
39. Al Musaimi, O., et al., Bypassing osmotic shock dilemma in a polystyrene resin using the green solvent cyclopentyl methyl ether (CPME): A morphological perspective. *Polymers*, 2019. 11(5): p. 874.

---

Looking for research-grade peptides? Browse the full catalog at [jayceypeptides.com](https://jayceypeptides.com/products).
$post$,
  'Review of green chemistry principles in solid phase peptide synthesis (SPPS), greener solvents, and CPME as a green ether for peptide precipitation.',
  true
)
on conflict (slug) do nothing;
