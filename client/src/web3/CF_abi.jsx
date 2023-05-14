const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_cftToken",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "userRated",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rateId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "visitId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum ChainFit.Rate",
				"name": "rate",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rateTime",
				"type": "uint256"
			}
		],
		"name": "NewRate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "addTime",
				"type": "uint256"
			}
		],
		"name": "NewVisit",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "visitId",
				"type": "uint256"
			},
			{
				"internalType": "enum ChainFit.Rate",
				"name": "rate",
				"type": "uint8"
			},
			{
				"internalType": "enum ChainFit.RateSource",
				"name": "rateSource",
				"type": "uint8"
			}
		],
		"name": "addRate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "addVisit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "chainFitToken",
		"outputs": [
			{
				"internalType": "contract ChainFitToken",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkLastVisitTime",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "visitId",
				"type": "uint256"
			}
		],
		"name": "checkRated",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkRequiredUserRatesToReward",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "visitId",
				"type": "uint256"
			}
		],
		"name": "checkVisit",
		"outputs": [
			{
				"internalType": "enum ChainFit.Result",
				"name": "result",
				"type": "uint8"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "visitId",
				"type": "uint256"
			}
		],
		"name": "checkVisitInProgress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "visitId",
				"type": "uint256"
			}
		],
		"name": "checkVisitRatesCount",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "visitId",
				"type": "uint256"
			}
		],
		"name": "checkVisitRatesResult",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "visitId",
				"type": "uint256"
			}
		],
		"name": "checkVisitRatesSocialmediaCount",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "visitId",
				"type": "uint256"
			}
		],
		"name": "checkVisitRatingTimeNotExceed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkWeekVisitLimit",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "historyTime",
				"type": "uint256"
			}
		],
		"name": "getUserVisitRates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "visitId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "userRated",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ratingTime",
						"type": "uint256"
					},
					{
						"internalType": "enum ChainFit.Rate",
						"name": "rate",
						"type": "uint8"
					},
					{
						"internalType": "enum ChainFit.RateSource",
						"name": "rateSource",
						"type": "uint8"
					}
				],
				"internalType": "struct ChainFit.GymVisitRate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "visitId",
				"type": "uint256"
			}
		],
		"name": "getVisitRates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "visitId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "userRated",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ratingTime",
						"type": "uint256"
					},
					{
						"internalType": "enum ChainFit.Rate",
						"name": "rate",
						"type": "uint8"
					},
					{
						"internalType": "enum ChainFit.RateSource",
						"name": "rateSource",
						"type": "uint8"
					}
				],
				"internalType": "struct ChainFit.GymVisitRate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVisitRatesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "visitId",
				"type": "uint256"
			}
		],
		"name": "getVisitRatesCountForVisit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endIndex",
				"type": "uint256"
			}
		],
		"name": "getVisits",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "visitId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "visitTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "hash",
						"type": "string"
					},
					{
						"internalType": "enum ChainFit.Result",
						"name": "result",
						"type": "uint8"
					},
					{
						"internalType": "uint256[]",
						"name": "ratesIds",
						"type": "uint256[]"
					}
				],
				"internalType": "struct ChainFit.GymVisit[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getVisits",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "visitId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "visitTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "hash",
						"type": "string"
					},
					{
						"internalType": "enum ChainFit.Result",
						"name": "result",
						"type": "uint8"
					},
					{
						"internalType": "uint256[]",
						"name": "ratesIds",
						"type": "uint256[]"
					}
				],
				"internalType": "struct ChainFit.GymVisit[]",
				"name": "visits",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVisitsCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]




export default abi;