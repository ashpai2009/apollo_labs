import type { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "p-001",
    slug: "antibiotic-resistance-ai",
    title: "Predicting Antibiotic Resistance from Patient History",
    authors: [
      { name: "Ashmit Pai", role: "Lead Author", affiliation: "Apollo Labs" },
      { name: "Naomi Reyes", role: "Data & Validation" },
    ],
    discipline: "Artificial Intelligence",
    type: "Research Paper",
    status: "Published",
    year: 2026,
    date: "2026-04-18",
    featured: true,
    emphasis: "featured",
    summary:
      "A gradient-boosted model that predicts resistance to first-line antibiotics using routinely collected patient history, with calibration analysis across demographic subgroups.",
    abstract:
      "Empiric antibiotic prescribing is often made before culture results return, and incorrect first-line choices measurably extend infection duration. We ask whether resistance can be anticipated from data already present in a patient's record at the moment of prescribing. Using a de-identified cohort of 41,208 urinary tract infection encounters, we trained gradient-boosted decision trees on prior prescriptions, prior culture results, comorbidity codes, recent inpatient exposure, and basic demographics — deliberately excluding any feature unavailable at prescribing time. The model reached an AUROC of 0.81 for trimethoprim-sulfamethoxazole resistance and 0.76 for ciprofloxacin, against a 0.63 baseline from prescribing guidelines alone. We report calibration separately by age band and sex, because an aggregate AUROC hides where a clinical model actually fails. Prior exposure to the same drug class within 180 days dominated feature attribution in every subgroup, which is both the most useful and the least surprising result: the record already knows more than the guideline uses.",
    tags: ["Machine Learning", "Public Health", "Gradient Boosting", "Calibration"],
    readingTime: 14,
    links: {
      paper: "#",
      github: "#",
      demo: "#",
    },
    content: [
      {
        id: "background",
        heading: "Background",
        body: [
          "Roughly half of antibiotic prescriptions for uncomplicated urinary tract infections are written empirically — that is, before any culture result exists. The prescriber chooses a first-line drug from a regional guideline, and if the isolate turns out to be resistant, the patient returns days later having gotten worse rather than better.",
          "Regional guidelines are built from aggregate resistance rates: if fewer than twenty percent of local isolates resist a drug, that drug stays first-line. This is a population-level rule applied to individuals, and it discards information the clinic already holds. A patient who took the same drug class two months ago is not the average patient.",
          "Prior work on individualized resistance prediction has largely used inpatient cohorts with rich laboratory panels. We were interested in the harder and more common case: an outpatient encounter where the only available data is what a routine chart contains.",
        ],
      },
      {
        id: "question",
        heading: "Research Question",
        body: [
          "Can resistance to first-line antibiotics be predicted, at prescribing time, using only features already recorded in a patient's history — and does that prediction remain calibrated across demographic subgroups rather than only in aggregate?",
          "The second half of that question mattered as much as the first. A model that is accurate overall but poorly calibrated for older patients would systematically misinform decisions for the group most affected by treatment failure.",
        ],
      },
      {
        id: "methodology",
        heading: "Methodology",
        body: [
          "We worked from a de-identified extract of 41,208 outpatient UTI encounters spanning six years, each with a matched urine culture and susceptibility panel. Encounters were split by time rather than at random: the first five years trained the model and the final year served as a held-out test set. Random splits inflate performance here, because resistance patterns drift year to year and a shuffled split lets the model see the future.",
          "Features were constrained to what a prescriber could see at the moment of decision. That gave us five families: prior antibiotic exposures bucketed by class and recency window, prior culture and susceptibility results, comorbidity codes, inpatient or long-term-care exposure in the preceding year, and age and sex. Anything derived from the current culture was excluded by construction, and we audited the feature list twice specifically for leakage.",
          "We trained gradient-boosted decision trees with early stopping on a validation slice carved from the final training year, and compared against two baselines: the regional guideline's fixed first-line choice, and logistic regression on the same feature set.",
        ],
        figure: {
          variant: "network",
          caption:
            "Figure 1 — Feature interaction structure recovered from the trained ensemble. Edge weight corresponds to interaction strength; prior-exposure features form the dense central cluster.",
        },
      },
      {
        id: "results",
        heading: "Results",
        body: [
          "On the held-out year the model reached an AUROC of 0.81 for trimethoprim-sulfamethoxazole resistance and 0.76 for ciprofloxacin. The guideline baseline, scored as a fixed decision rule, achieved an effective 0.63. Logistic regression on identical features reached 0.77 and 0.72 — enough to suggest that most of the signal is not subtle interaction effects but simply information the guideline ignores.",
          "Calibration was good in aggregate and uneven underneath it. For patients under 45 the model was well calibrated across the full probability range. For patients over 70 it was systematically underconfident in the 0.3 to 0.6 band, predicting roughly 0.4 where observed resistance was closer to 0.52. That subgroup was also the one with the most prior exposures, which we suspect saturates the recency features.",
          "Feature attribution was consistent and blunt: exposure to the same drug class within 180 days carried more weight than every demographic feature combined.",
        ],
        figure: {
          variant: "curves",
          caption:
            "Figure 2 — Calibration curves by age band on the held-out year. The dashed diagonal is perfect calibration; the over-70 band diverges through the middle of the range.",
        },
      },
      {
        id: "discussion",
        heading: "Discussion",
        body: [
          "The practical reading of these numbers is modest. An AUROC of 0.81 does not replace a culture, and nothing here should be used to withhold treatment. What it does support is reordering: when the model puts first-line resistance above roughly 0.45, a second-line choice is defensible on evidence the prescriber already had.",
          "The subgroup calibration gap is the result we would most want a reviewer to press on. Reporting only the aggregate figure would have made this project look cleaner and been less honest. A model deployed on this cohort would need per-subgroup recalibration before it could be trusted for the patients most likely to be affected.",
          "There are also limits we cannot resolve from this data. The cohort comes from a single regional health system, and resistance patterns are geographically local by nature. Transfer to another region is an open question, not an assumption.",
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        body: [
          "Routinely collected patient history contains enough signal to meaningfully outperform guideline-only empiric prescribing for UTI resistance, and most of that signal comes from a single intuitive source: recent prior exposure to the same drug class. The harder finding is that aggregate performance masks a real calibration failure in older patients, which any deployment would have to address first.",
          "Next steps are external validation on a second health system, and a prospective comparison against prescriber judgment rather than against the written guideline.",
        ],
      },
    ],
  },

  {
    id: "p-002",
    slug: "lumen-teaching-compiler",
    title: "Lumen: A Teaching Compiler for a Typed Subset of Python",
    authors: [{ name: "Dev Raghunathan", role: "Author" }],
    discipline: "Computer Science",
    type: "Software",
    status: "Published",
    year: 2026,
    date: "2026-03-02",
    featured: false,
    emphasis: "standard",
    summary:
      "A compiler that turns an annotated subset of Python into readable stack-machine bytecode, exposing every intermediate representation so students can watch their code lower.",
    abstract:
      "Compiler courses often ask students to trust a pipeline they cannot see. Lumen is a compiler for a statically typed subset of Python, written to be read rather than to be fast. It compiles to bytecode for a small stack machine, and every stage — token stream, parse tree, typed AST, control-flow graph, and final bytecode — is serializable and viewable side by side in a browser. The type checker implements Hindley-Milner inference restricted to a monomorphic core, which is enough to catch real errors while remaining explainable in a single lecture. Lumen compiles a 400-line test corpus, passes 214 behavioral tests against CPython semantics for the supported subset, and has been used by two study groups as a term-project scaffold.",
    tags: ["Compilers", "Type Systems", "Education", "TypeScript"],
    readingTime: 9,
    links: { github: "#", demo: "#" },
    content: [
      {
        id: "problem",
        heading: "Problem",
        body: [
          "Students in an introductory compilers course typically write a lexer, then a parser, then a code generator, and at no point do they see the whole pipeline as a continuous transformation. Each stage is graded in isolation and thrown away.",
          "The gap is not conceptual difficulty. It is that the intermediate representations are invisible. A parse tree exists for a few milliseconds inside a process and is never inspected.",
        ],
      },
      {
        id: "design",
        heading: "Design",
        body: [
          "Lumen accepts a subset of Python with mandatory type annotations on function signatures: integers, booleans, strings, fixed-size lists, functions, and nothing else. No classes, no generators, no dynamic attribute access. The restriction is the point — the subset is small enough that a student can hold the whole grammar in their head.",
          "Every stage emits a stable JSON artifact rather than an in-memory structure alone. The web viewer loads all five artifacts for a given source file and links them: hovering a token highlights the AST node it produced, and the bytecode instruction it eventually became.",
        ],
        figure: {
          variant: "lattice",
          caption:
            "Figure 1 — Stage graph. Each node emits a serialized artifact; dashed edges are the provenance links the viewer uses for cross-highlighting.",
        },
      },
      {
        id: "implementation",
        heading: "Implementation",
        body: [
          "The front end is a hand-written recursive descent parser — roughly 900 lines — chosen over a generator so that error messages could be written by hand. Type inference is Hindley-Milner with the polymorphic generalization step removed, which loses some expressiveness and removes an entire lecture's worth of confusion.",
          "The back end lowers the typed AST to a control-flow graph, runs constant folding and dead-block elimination, and emits bytecode for a 31-instruction stack machine. The virtual machine is 300 lines and students are expected to read all of it.",
        ],
      },
      {
        id: "testing",
        heading: "Testing",
        body: [
          "Behavioral correctness is checked differentially: each of 214 test programs is run under both Lumen's VM and CPython, and outputs must match exactly. Programs that use anything outside the supported subset are expected to fail at compile time with a specific error code, and those failures are tested too.",
          "The two study groups that used Lumen as a scaffold surfaced eleven bugs, nine of them in error messages rather than in codegen — which is roughly the ratio the design was hoping for.",
        ],
      },
      {
        id: "future",
        heading: "Future Work",
        body: [
          "Adding a register-allocation stage is the obvious next step, mostly because it is the stage students find most opaque. A stepping debugger over the bytecode is a smaller and probably more valuable addition.",
        ],
      },
    ],
  },

  {
    id: "p-003",
    slug: "printed-truss-joint-fatigue",
    title: "Fatigue Behavior of Printed Truss Joints Under Cyclic Load",
    authors: [
      { name: "Mara Ostrowski", role: "Lead" },
      { name: "Tomás Lindqvist", role: "Fabrication" },
    ],
    discipline: "Engineering",
    type: "Engineering",
    status: "Published",
    year: 2025,
    date: "2025-11-14",
    featured: false,
    emphasis: "standard",
    summary:
      "Cyclic load testing of four printed truss-joint geometries to failure, isolating the effect of fillet radius and print orientation on cycle life.",
    abstract:
      "Additively manufactured structural joints are widely used in student competition builds, but their fatigue behavior is usually assumed rather than measured. We fabricated four joint geometries in PETG at two print orientations and cycled each to failure on a purpose-built rig at 3 Hz under fully reversed axial load. Cycle life varied by a factor of eleven across the eight configurations. Fillet radius mattered less than expected above 2 mm; print orientation relative to the principal stress axis dominated. Every failure initiated at a layer boundary rather than at the geometric stress concentration, which reframes joint design for printed parts as a question of orientation planning rather than of fillet optimization. We report full S-N data, failure photographs, and the rig design.",
    tags: ["Fatigue", "Additive Manufacturing", "Structural Testing", "PETG"],
    readingTime: 11,
    links: { paper: "#", github: "#" },
    content: [
      {
        id: "problem",
        heading: "Problem",
        body: [
          "Printed joints appear throughout student engineering projects — frames, linkages, mounting brackets — and are almost always designed against static yield. Competition structures, however, fail in cyclic loading far more often than they fail in a single overload event.",
          "Published fatigue data for printed polymers exists but is dominated by standardized dogbone coupons, which do not capture the geometry that actually fails: a joint where several members meet.",
        ],
      },
      {
        id: "design",
        heading: "Design",
        body: [
          "We tested four joint geometries: a sharp-cornered baseline, and three with fillet radii of 1, 2, and 4 mm. Each geometry was printed in two orientations — layer planes normal to the load axis, and layer planes at 45 degrees to it — giving eight configurations, six specimens each.",
          "All specimens were printed on the same machine in a single filament lot to remove material variance, and were conditioned at ambient humidity for 72 hours before testing.",
        ],
        figure: {
          variant: "blueprint",
          caption:
            "Figure 1 — Joint geometry family and grip interface. Fillet radius r is the only varied dimension; overall envelope and grip length are held constant.",
        },
      },
      {
        id: "development",
        heading: "Test Rig Development",
        body: [
          "Commercial fatigue frames were unavailable to us, so the rig is a scotch-yoke driven by a brushless motor with a 20 kg load cell inline, logging at 500 Hz. Crosshead displacement is fixed by the yoke throw, so the test is displacement-controlled and load is a measured output.",
          "Rig compliance was characterized against a steel reference specimen and subtracted from all reported displacements. Drive frequency was held at 3 Hz to keep specimen surface temperature under 34 degrees Celsius, verified by thermocouple on a sacrificial specimen.",
        ],
      },
      {
        id: "results",
        heading: "Results",
        body: [
          "Cycle life to fracture spanned 4,100 cycles for the sharp-cornered normal-orientation specimens to 46,800 for the 4 mm fillet at 45 degrees. Between the 2 mm and 4 mm fillets at matched orientation, the difference was within specimen scatter — the returns on fillet radius flatten quickly.",
          "Orientation was the dominant variable at every fillet radius, with the 45-degree specimens averaging 3.4 times the life of their normal-orientation counterparts.",
          "In all 48 specimens, the crack initiated at a layer interface. In none of them did it initiate at the fillet root, which is where classical stress-concentration analysis predicts failure.",
        ],
      },
      {
        id: "future",
        heading: "Future Work",
        body: [
          "The obvious extension is a second material — a filled nylon would test whether the layer-interface dominance is a PETG-specific bonding property or general to fused deposition. Variable-amplitude loading closer to real competition duty cycles would also be more informative than fully reversed constant amplitude.",
        ],
      },
    ],
  },

  {
    id: "p-004",
    slug: "urban-heat-sensor-mesh",
    title: "Mapping Urban Heat Islands with a Low-Cost Sensor Mesh",
    authors: [
      { name: "Priya Anand", role: "Lead" },
      { name: "Ellis Warner", role: "Firmware" },
      { name: "Sofia Marchetti", role: "Analysis" },
    ],
    discipline: "Environmental Science",
    type: "Experiment",
    status: "Published",
    year: 2026,
    date: "2026-02-09",
    featured: true,
    emphasis: "wide",
    summary:
      "Thirty-one solar-powered sensor nodes deployed across nine square kilometers for a full summer, resolving intra-city temperature differences that satellite data averages away.",
    abstract:
      "Satellite land-surface temperature products resolve urban heat at roughly one kilometer, which is coarser than the blocks where heat exposure actually differs. We built and deployed 31 solar-powered temperature and humidity nodes across a nine-square-kilometer area for 94 days, transmitting over LoRa to a single gateway. Node siting was stratified by tree canopy cover and impervious surface fraction rather than placed conveniently. Peak intra-city differences reached 7.4 degrees Celsius between the hottest and coolest sites at the same hour, and the gap persisted overnight: high-canopy sites cooled 2.1 degrees faster in the three hours after sunset. Canopy cover within a 50-meter radius explained more variance in nighttime cooling rate than any other measured predictor, including distance to the city center.",
    tags: ["Climate", "LoRa", "Field Study", "Urban Ecology"],
    readingTime: 12,
    links: { github: "#", paper: "#", demo: "#" },
    content: [
      {
        id: "background",
        heading: "Background",
        body: [
          "Urban heat islands are well documented at the scale of a city versus its surroundings. What is less well resolved, and more consequential for the people living in them, is the variation within a city — between a street with mature canopy and a parking lot four hundred meters away.",
          "Publicly available satellite thermal products are the usual data source, and their native resolution flattens exactly the differences that matter. Ground truth at neighborhood scale generally does not exist because dense sensor deployment has historically been expensive.",
        ],
      },
      {
        id: "question",
        heading: "Research Question",
        body: [
          "How large are within-city temperature differences at block scale over a full summer, and which site characteristics best predict them — particularly for overnight cooling, which drives heat-related health outcomes more than daytime peak?",
        ],
      },
      {
        id: "methodology",
        heading: "Methodology",
        body: [
          "Each node pairs an SHT41 temperature and humidity sensor inside a printed radiation shield with a 1 W solar panel, a lithium cell, and a LoRa radio reporting every five minutes. Unit cost was roughly forty dollars. All 31 nodes were co-located for six days before deployment and cross-calibrated against a reference thermometer; offsets ranged from -0.31 to +0.24 degrees and were applied in post-processing.",
          "Siting was stratified rather than opportunistic. We classified the study area into nine strata by canopy cover and impervious fraction from municipal GIS layers, and placed three to four nodes per stratum, all at 2.5 meters on north-facing pole mounts to avoid direct insolation on the shield.",
          "Twenty-eight of 31 nodes survived the full 94 days. Two failed from water ingress after a storm in week six and one was removed by a property owner.",
        ],
        figure: {
          variant: "contour",
          caption:
            "Figure 1 — Interpolated mean temperature anomaly across the study area, 15:00 local, July aggregate. Contour interval 0.5 °C; node positions marked.",
        },
      },
      {
        id: "results",
        heading: "Results",
        body: [
          "The largest simultaneous difference between any two nodes was 7.4 degrees, recorded at 16:20 on a clear July afternoon between an unshaded commercial lot and a park interior 1.9 kilometers apart. Mean daytime spread across the network was 3.6 degrees.",
          "The overnight result was the more interesting one. In the three hours after sunset, high-canopy sites cooled at an average 1.9 degrees per hour against 1.2 for low-canopy sites — a 2.1 degree divergence by midnight that persisted until roughly 04:00.",
          "In a linear model of nighttime cooling rate, canopy cover within 50 meters was the strongest predictor. Impervious fraction at the same radius came second. Distance to city center, which is the variable most often used as a proxy in coarse studies, was not significant once the local terms were included.",
        ],
      },
      {
        id: "discussion",
        heading: "Discussion",
        body: [
          "The practical implication is that heat mitigation is a local intervention. The predictor that matters operates at a radius of tens of meters, which means canopy planted on a specific block changes outcomes on that block.",
          "Our study has one summer and one city, and the network cannot separate canopy shading from the evapotranspiration effect — both scale with canopy cover. Distinguishing them would need soil moisture instrumentation we did not have.",
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        body: [
          "A forty-dollar node and a stratified siting plan resolved intra-city heat structure that satellite products cannot see, and identified local canopy cover as the dominant predictor of overnight cooling. Full time series, node metadata, and the enclosure files are published alongside this project.",
        ],
      },
    ],
  },

  {
    id: "p-005",
    slug: "microplastic-enzyme-kinetics",
    title: "Microplastic Exposure and Digestive Enzyme Kinetics in Daphnia",
    authors: [{ name: "Iris Nakamura", role: "Lead" }, { name: "Joel Abara" }],
    discipline: "Biology",
    type: "Research Paper",
    status: "In Review",
    year: 2026,
    date: "2026-01-27",
    featured: false,
    emphasis: "standard",
    summary:
      "A 21-day exposure study measuring how polystyrene microparticle concentration alters digestive enzyme activity and reproductive output in Daphnia magna.",
    abstract:
      "Microplastic ingestion by freshwater zooplankton is established; the physiological pathway from ingestion to fitness cost is less so. We exposed Daphnia magna cultures to polystyrene microspheres at four concentrations for 21 days and assayed digestive protease and amylase activity alongside reproductive output. Protease activity declined monotonically with exposure concentration, dropping 38 percent at the highest dose relative to control. Amylase was unaffected at every concentration. Cumulative neonate production fell 29 percent at the highest dose. The selective effect on protease but not amylase suggests a mechanism more specific than generalized gut obstruction, and points toward particle surface interaction with the enzyme itself rather than reduced feeding rate alone.",
    tags: ["Ecotoxicology", "Enzyme Assay", "Freshwater", "Microplastics"],
    readingTime: 10,
    links: { paper: "#" },
    content: [
      {
        id: "background",
        heading: "Background",
        body: [
          "Daphnia are filter feeders and non-selective at the particle sizes typical of secondary microplastics, which makes them a standard sentinel organism. Studies consistently show reduced reproductive output under microplastic exposure; the usual explanation offered is gut blockage and consequent reduced energy intake.",
          "If that explanation were complete, digestive enzyme activity should fall broadly rather than selectively. That is a testable prediction, and to our knowledge it had not been directly tested with paired protease and amylase assays.",
        ],
      },
      {
        id: "question",
        heading: "Research Question",
        body: [
          "Does polystyrene microparticle exposure suppress digestive enzyme activity uniformly, as a generalized obstruction model predicts, or selectively — and does the pattern track reproductive cost?",
        ],
      },
      {
        id: "methodology",
        heading: "Methodology",
        body: [
          "Four treatment groups received 1 µm polystyrene microspheres at 0, 10, 100, and 1000 particles per milliliter, with six replicate vessels of ten neonates each. Cultures were maintained at 20 degrees on a 16:8 light cycle and fed Chlorella at a fixed ration daily.",
          "Neonates were counted and removed daily. On day 21, surviving adults were homogenized and assayed for protease activity by azocasein digestion and amylase by the dinitrosalicylic acid method, both normalized to total protein by Bradford assay.",
        ],
        figure: {
          variant: "contour",
          caption:
            "Figure 1 — Normalized enzyme activity against exposure concentration. Protease declines monotonically; amylase is flat within error at all doses.",
        },
      },
      {
        id: "results",
        heading: "Results",
        body: [
          "Protease activity fell with dose: 100 percent of control at 10 particles per mL, 79 percent at 100, and 62 percent at 1000. The trend was significant under a Jonckheere-Terpstra test for ordered alternatives.",
          "Amylase activity showed no significant difference at any concentration, with all group means within 6 percent of control.",
          "Cumulative neonate production per surviving adult fell 29 percent at the highest dose. Survival itself was not significantly affected — 92 percent in control versus 88 percent at the highest exposure.",
        ],
      },
      {
        id: "discussion",
        heading: "Discussion",
        body: [
          "A generalized obstruction mechanism predicts that both enzymes should be suppressed, since both act on the same obstructed bolus. The selective result is inconsistent with that and more consistent with direct interaction between the particle surface and the protease — polystyrene is known to adsorb proteins, and proteases would be more affected by surface adsorption than amylases operating on a polysaccharide substrate.",
          "This study cannot confirm that mechanism. A cell-free assay adding microspheres directly to purified enzyme would separate adsorption from any in vivo response, and is the first thing we would run next.",
        ],
      },
    ],
  },

  {
    id: "p-006",
    slug: "cable-driven-tactile-hand",
    title: "A Cable-Driven Prosthetic Hand with Distributed Tactile Feedback",
    authors: [
      { name: "Ravi Chandrasekar", role: "Lead" },
      { name: "Hana Kowalski", role: "Electronics" },
    ],
    discipline: "Robotics",
    type: "Engineering",
    status: "In Progress",
    year: 2026,
    date: "2026-05-06",
    featured: false,
    emphasis: "standard",
    summary:
      "A five-finger underactuated hand driven by four motors, with barometric tactile sensing in each fingertip mapped to vibrotactile feedback on the forearm.",
    abstract:
      "Commercial myoelectric hands are expensive and largely lack sensory feedback, leaving users dependent on vision for grasp confirmation. We are building an underactuated cable-driven hand with four motors controlling five fingers through a differential, and barometric pressure sensors potted into each fingertip. Contact force is mapped to a four-channel vibrotactile array worn on the forearm, so the wearer feels which finger made contact and how firmly. The current prototype grasps and holds objects from 40 to 900 grams, and completed 61 of 70 attempts on a standard grasp battery. Fingertip force resolution is approximately 0.4 newtons, sufficient for distinguishing contact from crush in preliminary trials with a rigid object set.",
    tags: ["Prosthetics", "Haptics", "Underactuation", "Embedded"],
    readingTime: 10,
    links: { github: "#", video: "#" },
    content: [
      {
        id: "problem",
        heading: "Problem",
        body: [
          "Grasping without sensation requires continuous visual attention. Users of sensory-free prosthetic hands report that this attentional cost, more than any mechanical limitation, is what makes a device tiring to use through a day.",
          "Adding feedback is not technically hard in isolation. Doing it inside a hand that also has to be light, quiet, and repairable with student-accessible tools is the actual constraint.",
        ],
      },
      {
        id: "motivation",
        heading: "Motivation",
        body: [
          "The design target was a hand that a maker with a printer and a soldering iron could rebuild, with feedback quality good enough to test the attentional claim experimentally rather than a device intended for clinical use.",
        ],
      },
      {
        id: "design",
        heading: "Design",
        body: [
          "Five fingers are driven by four brushed motors: the index and middle each have a dedicated actuator, while the ring and little finger share one through a whiffletree differential, and the thumb has its own. Underactuation lets the shared pair conform around irregular objects without any per-finger control.",
          "Each fingertip houses a barometric sensor potted in urethane rubber — a well-established approach that survives impact far better than exposed strain gauges and costs under three dollars per fingertip.",
        ],
        figure: {
          variant: "blueprint",
          caption:
            "Figure 1 — Tendon routing and differential layout. The whiffletree at the ring and little finger equalizes tension across both digits from a single actuator.",
        },
      },
      {
        id: "implementation",
        heading: "Implementation",
        body: [
          "An RP2040 reads all five barometric sensors over I2C at 200 Hz, applies a per-sensor baseline subtraction that tracks slow drift from temperature, and drives four LRA actuators on the forearm cuff through a PWM expander.",
          "Force-to-vibration mapping is logarithmic. A linear map made light contact imperceptible and firm contact saturating; the log map keeps the useful range where objects actually get held.",
        ],
      },
      {
        id: "testing",
        heading: "Testing",
        body: [
          "Against a 70-attempt grasp battery spanning ten object shapes, the hand completed 61. Failures clustered on thin flat objects lifted from a hard surface — a fingertip geometry problem rather than a control one.",
          "Fingertip resolution measured against a bench scale is approximately 0.4 newtons over the 0 to 12 newton range.",
        ],
      },
      {
        id: "future",
        heading: "Future Work",
        body: [
          "The next revision narrows the fingertip profile to address the flat-object failures, and adds a wrist rotation degree of freedom. Blindfolded object-identification trials are the experiment the feedback system was built to support and have not yet been run.",
        ],
      },
    ],
  },

  {
    id: "p-007",
    slug: "greedy-coloring-sparse-graphs",
    title: "Improved Bounds for Greedy Coloring on Sparse Random Graphs",
    authors: [{ name: "Yuki Brennan", role: "Author" }],
    discipline: "Mathematics",
    type: "Research Paper",
    status: "Published",
    year: 2025,
    date: "2025-12-08",
    featured: false,
    emphasis: "standard",
    summary:
      "A tightened upper bound on the number of colors used by degeneracy-ordered greedy coloring on sparse Erdős–Rényi graphs, with matching numerical evidence.",
    abstract:
      "Greedy coloring under a degeneracy ordering uses at most d+1 colors, where d is the graph's degeneracy. For sparse Erdős–Rényi graphs G(n, c/n) with constant c, this bound is loose: empirically the greedy algorithm uses noticeably fewer colors than degeneracy plus one. We prove an improved upper bound for this regime that closes roughly half the observed gap, using a second-moment argument over the ordering rather than a worst-case bound at each vertex. Numerical experiments across n up to 2×10⁶ and c from 1.5 to 8 agree with the new bound throughout and show the remaining gap narrowing slowly in c. We also give a family of graphs showing the argument cannot be improved beyond a constant factor by this technique.",
    tags: ["Graph Theory", "Random Graphs", "Probabilistic Method"],
    readingTime: 13,
    links: { paper: "#", github: "#" },
    content: [
      {
        id: "background",
        heading: "Background",
        body: [
          "Greedy coloring processes vertices in some order and assigns each the smallest color not used by an already-colored neighbor. Under a degeneracy ordering the number of colors is bounded by d+1, and this bound is tight in the worst case.",
          "For random graphs it is visibly not tight. Running the algorithm on G(n, c/n) with c = 4 gives colorings that use around fifteen percent fewer colors than the degeneracy bound predicts, consistently across n. That gap has a structural explanation worth writing down.",
        ],
      },
      {
        id: "question",
        heading: "Statement",
        body: [
          "The degeneracy bound is worst-case at every vertex: it assumes each vertex, when colored, sees d distinct colors among its earlier neighbors. In a random graph the earlier neighbors of a typical vertex share colors with each other far more often than that assumption allows.",
        ],
      },
      {
        id: "methodology",
        heading: "Proof Approach",
        body: [
          "We track the color multiset seen by each vertex at the moment it is colored, rather than only its back-degree. The key lemma bounds the expected number of distinct colors among the back-neighbors of a vertex in the degeneracy ordering, using a second-moment computation over the randomness of the graph conditioned on the ordering.",
          "The conditioning is the delicate part — the degeneracy ordering is itself a function of the graph, so the back-neighborhood is not a uniformly random set. We handle this with an exposure argument that reveals edges in ordering-peeling rounds.",
        ],
        figure: {
          variant: "curves",
          caption:
            "Figure 1 — Colors used by degeneracy-ordered greedy against c, with the classical d+1 bound, the improved bound, and measured values at n = 10⁶.",
        },
      },
      {
        id: "results",
        heading: "Results",
        body: [
          "The resulting bound sits strictly below d+1 for all c above roughly 1.4 and closes about half the empirically observed gap at c = 4, with the fraction closed decreasing slowly as c grows.",
          "Numerical experiments across n from 10⁴ to 2×10⁶ and c from 1.5 to 8 never violate the bound and track it within a few percent at the lower end of the c range.",
        ],
      },
      {
        id: "discussion",
        heading: "Limitations",
        body: [
          "We give a graph family for which the second-moment step is essentially tight, which means closing the remaining gap requires a different technique — most plausibly a martingale argument tracking the full color distribution rather than only its support size.",
        ],
      },
    ],
  },

  {
    id: "p-008",
    slug: "meridian-crdt-notes",
    title: "Meridian: Conflict-Free Offline Notes with CRDTs",
    authors: [
      { name: "Alina Petrov", role: "Lead" },
      { name: "Marcus Oyelaran", role: "Sync Layer" },
    ],
    discipline: "Computer Science",
    type: "Software",
    status: "Published",
    year: 2026,
    date: "2026-03-21",
    featured: false,
    emphasis: "wide",
    summary:
      "A notes application built on a sequence CRDT that merges concurrent edits from fully offline devices without a server arbitrating order.",
    abstract:
      "Most collaborative editors assume connectivity and resolve conflicts on a server. Meridian assumes the opposite: every device holds a complete replica, edits apply locally, and merges happen whenever two replicas eventually meet. The document model is an RGA sequence CRDT with a tombstone compaction pass that runs when all known replicas have acknowledged a version. We measured merge correctness against a randomized concurrent-edit harness of 50,000 trials with zero divergences, and profiled memory against document age: an unpruned 40,000-operation document holds 3.1 MB, which compaction reduces to 480 KB. Sync is peer-to-peer over WebRTC with a lightweight signaling relay that never sees document content.",
    tags: ["CRDT", "Distributed Systems", "Offline-First", "WebRTC"],
    readingTime: 11,
    links: { github: "#", demo: "#" },
    content: [
      {
        id: "problem",
        heading: "Problem",
        body: [
          "Note-taking applications are used in exactly the conditions where connectivity fails — fieldwork, transit, buildings with bad reception. Server-arbitrated sync degrades to read-only or, worse, to silent conflict loss.",
          "Conflict-free replicated data types solve this in principle. The engineering question is whether an implementation can stay within a memory budget that a phone tolerates over months of use.",
        ],
      },
      {
        id: "design",
        heading: "Design",
        body: [
          "The document is a replicated growable array: each character insertion carries a unique identifier and a reference to its left neighbor, and deletions mark tombstones rather than removing elements. Merge is a deterministic function of the operation set, so replicas that have seen the same operations agree regardless of arrival order.",
          "Tombstones are the memory problem. Meridian runs a compaction pass that permanently removes tombstoned elements once every known replica has acknowledged a version at or beyond the deletion, tracked with a version vector.",
        ],
        figure: {
          variant: "lattice",
          caption:
            "Figure 1 — Concurrent insertion resolution. Two replicas insert at the same position offline; identifier ordering produces the same interleaving on both after merge.",
        },
      },
      {
        id: "implementation",
        heading: "Implementation",
        body: [
          "The core is 1,400 lines of TypeScript with no runtime dependencies, so it can run in a browser, a service worker, or Node. Operations persist to IndexedDB in append-only batches; the in-memory structure rebuilds from the log on cold start in under 200 ms for a 40,000-operation document.",
          "Peer sync runs over WebRTC data channels. A signaling relay pairs peers by room identifier and passes nothing else; document operations never touch it.",
        ],
      },
      {
        id: "testing",
        heading: "Testing",
        body: [
          "Correctness is checked by a randomized harness that forks a document across three to six simulated replicas, applies random edit sequences offline, then merges in random pairwise order and asserts convergence. Across 50,000 trials there were no divergences.",
          "Memory profiling against document age: 40,000 operations occupy 3.1 MB uncompacted and 480 KB after a compaction pass, which is the number that determines whether the design is usable long-term.",
        ],
      },
      {
        id: "future",
        heading: "Future Work",
        body: [
          "Rich text needs a formatting layer over the sequence, which introduces its own concurrency semantics — concurrent bold and italic over overlapping ranges is not obviously resolvable by the same mechanism. Encrypted sync is the other open item.",
        ],
      },
    ],
  },

  {
    id: "p-009",
    slug: "winter-solar-tracking-yield",
    title: "Single-Axis Solar Tracking Yield at High Latitude in Winter",
    authors: [{ name: "Ellis Warner", role: "Lead" }, { name: "Priya Anand" }],
    discipline: "Engineering",
    type: "Experiment",
    status: "Published",
    year: 2025,
    date: "2025-10-19",
    featured: false,
    emphasis: "standard",
    summary:
      "A paired-array field experiment measuring whether single-axis tracking recovers its energy cost during short high-latitude winter days.",
    abstract:
      "Single-axis tracking reliably increases photovoltaic yield in summer, but the case is weaker in winter at high latitude, where the sun traverses a short low arc and the tracker's own consumption is a larger fraction of a smaller harvest. We ran two identical 400 W arrays side by side for 68 winter days — one fixed at latitude tilt, one on a single-axis tracker — logging generation, tracker consumption, and irradiance at one-minute resolution. The tracked array produced 14.1 percent more gross energy. After subtracting tracker consumption, net gain fell to 9.2 percent. On the 19 overcast days in the sample the tracked array was net negative, losing 1.8 percent against fixed tilt, which is the result that determines whether tracking is worth installing in a given winter climate.",
    tags: ["Photovoltaics", "Field Experiment", "Energy Systems"],
    readingTime: 9,
    links: { github: "#", paper: "#" },
    content: [
      {
        id: "problem",
        heading: "Problem",
        body: [
          "Tracker manufacturers quote annual yield gains derived largely from summer performance and clear-sky conditions. For an installation whose binding constraint is winter supply, the annual average is the wrong number.",
          "Winter at high latitude compresses the solar arc, reduces total available energy, and increases the share of diffuse irradiance — all three of which cut against tracking.",
        ],
      },
      {
        id: "design",
        heading: "Experimental Design",
        body: [
          "Two arrays of identical panels from a single production lot were installed four meters apart on the same open site: one fixed at latitude tilt facing true south, one on a horizontal single-axis tracker. Both fed matched charge controllers into a dump load, so neither array was ever curtailed by a full battery.",
          "Generation, tracker motor consumption, plane-of-array irradiance, and ambient temperature were logged at one-minute resolution for 68 consecutive days. Arrays were swept clear of snow simultaneously each morning.",
        ],
        figure: {
          variant: "curves",
          caption:
            "Figure 2 — Daily energy, tracked versus fixed. Clear days separate cleanly; overcast days cluster on the diagonal and below it.",
        },
      },
      {
        id: "results",
        heading: "Results",
        body: [
          "Gross generation over the full period favored the tracked array by 14.1 percent. Tracker motor and controller consumption averaged 34 Wh per day, cutting the net advantage to 9.2 percent.",
          "Splitting by sky condition changes the picture. On the 41 predominantly clear days, net gain was 16.4 percent. On the 19 overcast days, the tracked array finished 1.8 percent behind fixed tilt — diffuse irradiance is close to isotropic, so tracking gains almost nothing while the motor keeps drawing.",
        ],
      },
      {
        id: "future",
        heading: "Future Work",
        body: [
          "A controller that parks the tracker flat when measured diffuse fraction exceeds a threshold would recover most of the overcast-day loss, and is a small firmware change we intend to test next winter against the same fixed reference.",
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const byDiscipline = PROJECTS.filter(
    (p) => p.id !== project.id && p.discipline === project.discipline,
  );
  const byTag = PROJECTS.filter(
    (p) =>
      p.id !== project.id &&
      !byDiscipline.includes(p) &&
      p.tags.some((t) => project.tags.includes(t)),
  );
  const rest = PROJECTS.filter(
    (p) => p.id !== project.id && !byDiscipline.includes(p) && !byTag.includes(p),
  );
  return [...byDiscipline, ...byTag, ...rest].slice(0, limit);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatShortDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function authorLine(project: Project): string {
  const names = project.authors.map((a) => a.name);
  if (names.length <= 2) return names.join(" & ");
  return `${names[0]} +${names.length - 1}`;
}

export function disciplineCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of PROJECTS) {
    counts.set(p.discipline, (counts.get(p.discipline) ?? 0) + 1);
  }
  return counts;
}
