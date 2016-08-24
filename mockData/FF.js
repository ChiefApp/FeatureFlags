let fflags = {
    "featureFlags": {
        "application": "www.appKey",
        "children": [
            {
                "feature": {
                    "featureKey": "Search",
                    "enabled": true,
                    "variationName": "v2",
                    "configurationData": { "this": "that" }
                }
            },
            {
                "featureGrouping": {
                    "featureGroupKey": "MarketingCentre",
                    "enabled": true,
                    "children": [
                        {
                            "feature": {
                                "featureKey": "Campaigns",
                                "enabled": true,
                                "variationName": "v2",
                                "configurationData": { "this": "that" }
                            }
                        }
                    ]
                }
            },
            {
                "featureGrouping": {
                    "featureGroupKey": "Dashboard",
                    "enabled": true,
                    "children": [
                        {
                            "feature": {
                                "featureKey": "D",
                                "enabled": true,
                                "variationName": "v2",
                                "controllerOrComponentFiles": "",
                                "configurationData": {
                                    "this": "that"
                                }
                            }
                        }
                    ]
                }
            }
        ]
    }
};