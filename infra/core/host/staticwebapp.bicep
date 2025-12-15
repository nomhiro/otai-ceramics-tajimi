@description('Name of the Static Web App')
param name string

@description('Azure region for the resource')
param location string

@description('SKU for the Static Web App')
@allowed(['Free', 'Standard'])
param sku string = 'Free'

@description('Tags for the resource')
param tags object = {}

@description('SendGrid API Key')
@secure()
param sendGridApiKey string = ''

@description('Contact form recipient email')
param contactToEmail string = ''

@description('Contact form sender email')
param contactFromEmail string = ''

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: name
  location: location
  tags: tags
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'GitHub'
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

// Application settings for API
resource appSettings 'Microsoft.Web/staticSites/config@2023-12-01' = {
  parent: staticWebApp
  name: 'appsettings'
  properties: {
    SENDGRID_API_KEY: sendGridApiKey
    CONTACT_TO_EMAIL: contactToEmail
    CONTACT_FROM_EMAIL: contactFromEmail
  }
}

output name string = staticWebApp.name
output defaultHostname string = staticWebApp.properties.defaultHostname
output id string = staticWebApp.id
