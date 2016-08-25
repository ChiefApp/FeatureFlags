# Feature Toggle Client

version = 0.2.0

Typescript/Javascript client library for,
- Feature flags/toggles
- Using variation information within a feature object to make dynamic decisions
    - A/B testing
    - Toggle features for Paid vs Free vs Admin 

```
{
    "featureKey" : "search"
    "enabled" : true
    "variationName" : "VarationA",
    "configurationData" : { "template": "new_template.html" }
}
```

## Getting Started:
Step 1:
    `npm install https://github.com/MyLocalEnterprises/FeatureFlags.git`

Step 2: Setup config
```
import {FFModule} from "FFModule"

let ffmodule = FFModule.config(
                        "WEB",
                        "http://FFServerURL", 
                        customFeatureLookupClass)
```

Step 3: 
- You can directly get the Feature as a promise or just check if the feature is enabled or not
```
let isSearchEnabled:Promise<Boolean> = ffmodule.isFeatureEnabled("search", "trial_user_1")
```
```
// gets a single feature
let searchFeature:Promise<Feature> = ffmodule.getFeature("search", "admin_user_1")

// gets all enabled features
let enabledFeatures:Promise<FeatureFlags> = ffmodule.getEnabledFeatures("admin_user_1")
```


## Examples:
- In Typescript Projects:
```
import {FFModule} from "FFModule"
// set config

let ffmodule = FFModule.config("WEB", "http://FFServer", undefined)
ffmodule.isFeatureEnabled("featureName", "customer_id_1")

```
- In Javascript Projects:
```
var FFModule = require('FFModule')
```

<hr>
## TODO: Custom offline class 
    - Add a sample customFeatureLookup class to demonstrate this functionality
<hr>


## API Contract: 
BYO Feature Flag server.
```
- /feature/:featureKey?devices=WEB&user_id=user-key
- /features?enabled=true&user_id=user-key
```
Models:
 `ts/models/`
 

## Development

To run tests:
`npm run karma`

To run test coverage with remap:
`npm run post`
`npm run coverage`

## Resources: 
Some resources to learn more about feature flags
- http://martinfowler.com/articles/feature-toggles.html
- https://www.youtube.com/watch?v=gxm1C92XhCQ
