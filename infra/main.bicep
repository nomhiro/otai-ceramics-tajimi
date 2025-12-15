targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the environment (used for resource naming)')
param environmentName string

@minLength(1)
@description('Azure region for resources')
param location string = 'japaneast'

@description('Azure region for Static Web Apps (limited availability: westus2, centralus, eastus2, westeurope, eastasia)')
param staticWebAppLocation string = 'eastasia'

@description('SendGrid API Key for contact form emails')
@secure()
param sendGridApiKey string = ''

@description('Email address to receive contact form submissions')
param contactToEmail string = 'webmaster@otai.co.jp'

@description('Email address to send contact form emails from')
param contactFromEmail string = 'noreply@otai.co.jp'

var resourceToken = toLower(uniqueString(subscription().subscriptionId, environmentName, location))
var tags = {
  'azd-env-name': environmentName
  'project': 'otai-ceramics'
}

// Resource Group
resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: 'rg-${environmentName}'
  location: location
  tags: tags
}

// Azure Static Web Apps
module swa 'core/host/staticwebapp.bicep' = {
  name: 'staticwebapp'
  scope: rg
  params: {
    name: 'swa-otai-${resourceToken}'
    location: staticWebAppLocation
    sku: 'Free'
    tags: union(tags, { 'azd-service-name': 'web' })
    sendGridApiKey: sendGridApiKey
    contactToEmail: contactToEmail
    contactFromEmail: contactFromEmail
  }
}

// Outputs
output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId
output STATIC_WEB_APP_NAME string = swa.outputs.name
output STATIC_WEB_APP_URL string = 'https://${swa.outputs.defaultHostname}'
