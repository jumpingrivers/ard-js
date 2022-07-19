(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.datasets = {}));
})(this, (function (exports) { 'use strict';

  var data = [
  	{
  		person_id: "00158242",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00072313",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00437919",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00254949",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00129991",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00158012",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00381163",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00717105",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00901914",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00621512",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00441583",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00574876",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00767489",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00198026",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00633114",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00776407",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00065315",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00160954",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00299482",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00867981",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00954616",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00488181",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00428769",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00306863",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00419934",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00399770",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00304422",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00986269",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00903637",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00484066",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00519084",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00835731",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00918666",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00098469",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00150141",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00555011",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00765409",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00636139",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00622799",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00653284",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00715673",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00628378",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00585971",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00108661",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00457761",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00279131",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00270842",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00298333",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00135933",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00694473",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00611973",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00840738",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00416064",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00789282",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00253967",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00403540",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00786180",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00069839",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00592415",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00461983",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00806894",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00146133",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00791021",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00216364",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00979192",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00126738",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00865090",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00287317",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00152971",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00269318",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00950119",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00559087",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00773642",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00652580",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00771628",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00100208",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00329678",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00372542",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00220348",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00040209",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00569511",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00690757",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00454313",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00722032",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00516269",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00073997",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00633334",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00026021",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00805197",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00883816",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00839563",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00089069",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00786809",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00974839",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00504776",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00870220",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00949865",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00837745",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00626810",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00936664",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00636609",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00960269",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00174273",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00522615",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00341286",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00070870",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00258997",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00430853",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00214262",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00368303",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00169666",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00434700",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00345667",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00398516",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00027850",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00226942",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00693092",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00591781",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00328841",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00179992",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00547072",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00767051",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00273723",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00381310",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00745846",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00669428",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00702922",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00349989",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00470413",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00455170",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00495989",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00033264",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00171655",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00913931",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00500243",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00897083",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00128448",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00755558",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00925527",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00251225",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00907306",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00250234",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00119836",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00480840",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00449622",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00365607",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00170460",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00176508",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00718460",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00737186",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00501133",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00234407",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00847689",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00782992",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00471715",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00392597",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00218661",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00817457",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00777071",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00219886",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00180595",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00693265",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00758121",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00230857",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00183608",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00111987",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00781849",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00978913",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00868545",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00939157",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00197315",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00201194",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00572523",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00097178",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00619962",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00307865",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00996593",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00265395",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00853139",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00278895",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00869138",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00051155",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00488636",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00296380",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00941895",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00595281",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00336930",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00160031",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00335725",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00140268",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00545845",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00157313",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00689057",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00603281",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00855130",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00716252",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00430408",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00314036",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00016921",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00221997",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00412265",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00299664",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00471691",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00362843",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00345724",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00089630",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00205415",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00569584",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00938787",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00906567",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00698704",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00820041",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00424100",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00449300",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00384245",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00927829",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00839099",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00593097",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00243050",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00263507",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00305108",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00672703",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00884487",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00384696",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00850030",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00179270",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00230268",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00277630",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00757765",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00595939",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00172942",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00629043",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00758824",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00888479",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00148941",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00459825",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00380995",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00516114",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00180828",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00386834",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00710973",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00279511",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00108468",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00320825",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00693835",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00065448",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00636879",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00536244",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00868794",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00806957",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00621679",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00106427",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00748648",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00935584",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00896050",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00896355",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00446784",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00542441",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00485469",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00918471",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00785722",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00935868",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00644638",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00981841",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00418626",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00188564",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00523392",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00025816",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00477988",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00146720",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00912638",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00457813",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00410915",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00690846",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00665286",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00597808",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00281398",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00072998",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00908267",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00114288",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00435317",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00597114",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00131381",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00339732",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00263077",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00471306",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00147277",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00012120",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00370496",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00334740",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00160995",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00875532",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00531542",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00949813",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00829169",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00318803",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00821249",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00110225",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00168986",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00409466",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00793129",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00258530",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00292312",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00989355",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00485939",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00109741",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00703096",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00568146",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00236914",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00850734",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00067386",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00939578",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00149319",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00405787",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00630826",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00150144",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00244802",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00711774",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00455991",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00197377",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00257658",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00974855",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00356035",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00466232",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00258639",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00744417",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00437822",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00886915",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00938524",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00586073",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00642478",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00554808",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00128478",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00400134",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00640063",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00976141",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00696628",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00887481",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00570863",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00640242",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00802312",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00158921",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00231743",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00374191",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00398614",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00182779",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00022396",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00561366",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00427496",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00398764",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00877287",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00862435",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00010303",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00599084",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00399609",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00200589",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00151077",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00407439",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00015868",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00481308",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00517575",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00553036",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00843596",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00655969",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00898543",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00522337",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00551850",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00738401",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00637566",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00219411",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00254510",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00773672",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00316268",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00880300",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00013550",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00065467",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00790947",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00915274",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00957417",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00330862",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00260704",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00151106",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00562832",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00814546",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00342746",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00660921",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00715586",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00968269",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00350557",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00479763",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00845407",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00386064",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00072828",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00647733",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00291553",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00646425",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00747248",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00932171",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00018672",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00248265",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00014415",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00843295",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00794513",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00785069",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00471448",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00360783",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00475224",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00511234",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00505883",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00656953",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00907153",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00735364",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00821621",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00015338",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00515718",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00384547",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00217154",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00691794",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00786309",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00550652",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00332881",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00865329",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00977086",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00849343",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00267772",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00271211",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00974922",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00978573",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00730292",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00854673",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00465383",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00918585",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00259534",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00203113",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00947655",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00641982",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00808933",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00361489",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00050279",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00603112",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00918329",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00581097",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00191635",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00575561",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00478599",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00012467",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00745780",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00281779",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00599937",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00401702",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00409935",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00027140",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00363443",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00706880",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00177422",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00010495",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00210664",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00324401",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00040136",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00318577",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00529601",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00211542",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00526777",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00465060",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00715752",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00721746",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00609057",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00940659",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00423180",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00674447",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00840468",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00867792",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00305533",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00903380",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00554990",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00175398",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00042752",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00122535",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00918487",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00003380",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00032286",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00993976",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00646805",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00409152",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00776332",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00835522",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00731706",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00020101",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00763659",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00258277",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00734708",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00018070",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00424658",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00116567",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00172113",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00291058",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00166602",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00314599",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00806438",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00705060",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00312464",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00932736",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00630220",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00258509",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00847982",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00757512",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00388390",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00652049",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00221804",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00102555",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00970842",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00033454",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00687969",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00192304",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00523342",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00978722",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00951981",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00619635",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00363335",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00542793",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00849411",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00597373",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00991393",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00112889",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00989226",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00851322",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00793810",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00818559",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00186814",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00859394",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00500018",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00414153",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00808689",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00118179",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00354258",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00752168",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00721793",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00293559",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00647277",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00056560",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00390801",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00633006",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00902393",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00008599",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00568707",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00731649",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00518676",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00409587",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00961692",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00903287",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00425112",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00324840",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00945440",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00799878",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00914327",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00270470",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00943079",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00968810",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00482158",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00693725",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00081192",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00718704",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00686902",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00552578",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00830912",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00033700",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00947047",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00696244",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00007808",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00305590",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00363033",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00954080",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00735422",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00100307",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00770652",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00548410",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00786737",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00172111",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00828755",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00197187",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00522435",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00179105",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00427851",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00895163",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00705789",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00789324",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00410321",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00637984",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00833490",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00793989",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00634975",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00170567",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00357675",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00600875",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00982863",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00055604",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00646379",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00400776",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00766113",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00981315",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00351502",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00067738",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00773856",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00035678",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00648386",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00593746",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00582638",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00642538",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00121268",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00398107",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00244091",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00859578",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00519563",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00065065",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00624845",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00200590",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00468768",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00678876",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00503113",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00772021",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00311855",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00880750",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00567888",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00802514",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00686762",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00870763",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00729878",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00256491",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00810558",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00683145",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00278692",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00938912",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00596868",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00798951",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00022697",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00392722",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00848128",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00771169",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00460025",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00686385",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00573562",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00077692",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00866964",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00699397",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00682595",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00645470",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00268337",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00879871",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00778268",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00472619",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00000212",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00271320",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00133115",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00669874",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00732584",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00911035",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00014583",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00056620",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00233768",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00723767",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00631624",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00422268",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00375639",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00035732",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00449979",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00924638",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00802829",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00077159",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00644840",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00274126",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00578816",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00232337",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00554726",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00413627",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00344037",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00229790",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00287545",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00831564",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00891162",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00265200",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00276021",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00477005",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00465886",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00938573",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00945121",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00042925",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00310488",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00418898",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00936931",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00982235",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00347294",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00856888",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00784806",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00249085",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00950610",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00753287",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00802862",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00845848",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00905587",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00441060",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00588263",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00582741",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00596011",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00789216",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00931871",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00185554",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00132808",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00900761",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00188243",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00806971",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00529863",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00307435",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00493403",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00816112",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00627744",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00905196",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00225940",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00531912",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00361422",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00527428",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00920434",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00210210",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00962147",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00181505",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00048574",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00712199",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00052048",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00802557",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00725534",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00857869",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00370015",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00562893",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00638426",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00029999",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00787733",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00654024",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00266873",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00610896",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00416457",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00180118",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00236631",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00483596",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00958154",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00239531",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00701862",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00923942",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00621762",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00691520",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00967568",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00156038",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00348621",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00936789",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00226945",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00268893",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00814001",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00281347",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00825027",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00481081",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00123129",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00918231",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00156370",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00667764",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00423070",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00523577",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00768651",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00003024",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00235169",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00154322",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00116267",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00283267",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00964993",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00569039",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00548538",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00776528",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00143011",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00957732",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00220738",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00058204",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00714329",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00025123",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00365241",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00966219",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00715008",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00241202",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00489010",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00146581",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00387331",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00775719",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00368008",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00230370",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00693536",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00559738",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00432215",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00372366",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00096221",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00802042",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00355304",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00801719",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00973939",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00506148",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00806592",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00754366",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00722339",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00931764",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00729875",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00201445",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00395099",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00071969",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00373268",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00317469",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00795051",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00882206",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00102633",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00419650",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00143741",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00739767",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00460110",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00659861",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00164290",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00627192",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00155289",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00422618",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00049852",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00318914",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00488817",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00817644",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00116748",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00038677",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00897267",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00571946",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00398909",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00916998",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00118125",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00681821",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00877928",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00724735",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00389693",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00548417",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00721066",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00028354",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00169949",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00375510",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00877086",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00597691",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00517446",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00315896",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00249668",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00489065",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00101819",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00398752",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00779482",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00253347",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00897787",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00697918",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00151332",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00093658",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00074465",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00925148",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00509001",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00167164",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00858420",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00065549",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00641470",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00719489",
  		student_type: "returning",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00038958",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00959315",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00843718",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00693868",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00890384",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00138546",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00343390",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00521019",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00714087",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00492582",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00727330",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00435466",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00226684",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00540384",
  		student_type: "transfer",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00818619",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00344630",
  		student_type: "graduate",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00723964",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00978592",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00974847",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00674628",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00689221",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00135600",
  		student_type: "returning",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00721713",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00384142",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00427992",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00249023",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00503059",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00834103",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00733905",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00594076",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00028823",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00070818",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00520510",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00169320",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00505566",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00071164",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00359253",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00630431",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00406109",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00938353",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00766481",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00691504",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00278438",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00289019",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00121471",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00293046",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00325459",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00151150",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00181298",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00074753",
  		student_type: "graduate",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00837940",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00643367",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00124716",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00822957",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00999469",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00080479",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00729373",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00010879",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00793713",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00038586",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00279792",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00875061",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00842502",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00300264",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00079864",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00616740",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00363092",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00659298",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00328256",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00789547",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00802920",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00866971",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00174985",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00011401",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00574392",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00847481",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "low",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00835127",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00653609",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00511150",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00144566",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00840179",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00275157",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00175122",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00455631",
  		student_type: "continuing",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00163545",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00771528",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00060771",
  		student_type: "transfer",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00596851",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00542408",
  		student_type: "graduate",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "low",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00734145",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00534928",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00435180",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00170485",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00082370",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00015875",
  		student_type: "transfer",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00698004",
  		student_type: "continuing",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "SC",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00256223",
  		student_type: "continuing",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00047189",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00564525",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00701615",
  		student_type: "returning",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00636195",
  		student_type: "transfer",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00829958",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00526906",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00044328",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00963945",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00167344",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00230265",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00331892",
  		student_type: "transfer",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "BS",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00586872",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00664899",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "HU",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00916079",
  		student_type: "graduate",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "HS",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00261558",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00740763",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "BS",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00636511",
  		student_type: "returning",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00303819",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "ED",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00907445",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "ED",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00208158",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "race_ethnicity_unknown",
  		college: "LR",
  		gpa: "high",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00810114",
  		student_type: "continuing",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00587440",
  		student_type: "continuing",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "ED",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00344526",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "HS",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00637866",
  		student_type: "graduate",
  		ipeds_race_ethn: "american_indian_or_alaskan_native",
  		college: "ED",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00522621",
  		student_type: "transfer",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "high",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00300163",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00009033",
  		student_type: "graduate",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00532065",
  		student_type: "continuing",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "high",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00167438",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "SC",
  		gpa: "low",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00553717",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "SC",
  		gpa: "medium",
  		club: false,
  		outcome: "retained"
  	},
  	{
  		person_id: "00212888",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "medium",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00145723",
  		student_type: "transfer",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HS",
  		gpa: "medium",
  		club: false,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00994279",
  		student_type: "ut_first_time",
  		ipeds_race_ethn: "hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00547448",
  		student_type: "returning",
  		ipeds_race_ethn: "white_non_hispanic",
  		college: "HU",
  		gpa: "high",
  		club: false,
  		outcome: "dropped"
  	},
  	{
  		person_id: "00990938",
  		student_type: "continuing",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "LR",
  		gpa: "medium",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00003303",
  		student_type: "ipeds_first_time",
  		ipeds_race_ethn: "black_non_hispanic",
  		college: "BS",
  		gpa: "low",
  		club: true,
  		outcome: "graduated"
  	},
  	{
  		person_id: "00506239",
  		student_type: "graduate",
  		ipeds_race_ethn: "hispanic",
  		college: "LR",
  		gpa: "low",
  		club: true,
  		outcome: "retained"
  	},
  	{
  		person_id: "00958447",
  		student_type: "returning",
  		ipeds_race_ethn: "asian_or_pacific_islander",
  		college: "ED",
  		gpa: "high",
  		club: true,
  		outcome: "stopped"
  	},
  	{
  		person_id: "00218203",
  		student_type: "returning",
  		ipeds_race_ethn: "non_resident_alien",
  		college: "HU",
  		gpa: "medium",
  		club: false,
  		outcome: "dropped"
  	}
  ];

  var steps = [
  	[
  		"student_type",
  		"ipeds_race_ethn"
  	],
  	[
  		"college",
  		"gpa"
  	],
  	[
  		"club"
  	],
  	[
  		"outcome"
  	]
  ];

  exports.data = data;
  exports.steps = steps;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=datasets.js.map
