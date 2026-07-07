// Script Azure Bicep para provisionar a infraestrutura da aplicação na nuvem
// Define o plano de execução e o Web App (Azure App Service)

@description('Localização geográfica onde os recursos serão provisionados')
param location string = resourceGroup().location

@description('Nome base para os recursos provisionados (será concatenado com identificadores únicos)')
param appName string = 'fullstack-portfolio'

@description('Tamanho (SKU) do Plano de Execução do App Service. F1 representa a camada gratuita (Free)')
@allowed([
  'F1'
  'B1'
  'S1'
])
param skuName string = 'F1'

@description('Versão do runtime para execução Linux (ex: .NET 9)')
param linuxFxVersion string = 'DOTNET|9.0'

var appServicePlanName = 'plan-${appName}'
var webAppName = 'web-${appName}-${uniqueString(resourceGroup().id)}'

// 1. Provisiona o Plano de Serviço de Aplicativo (App Service Plan) em Linux
resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: skuName
    tier: skuName == 'F1' ? 'Free' : 'Basic'
  }
  kind: 'linux'
  properties: {
    reserved: true // Obrigatório para instâncias Linux no App Service
  }
}

// 2. Provisiona o Serviço de Aplicativo (Web App) para rodar o backend/frontend
resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: webAppName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: linuxFxVersion
      appSettings: [
        {
          name: 'ASPNETCORE_ENVIRONMENT'
          value: 'Production'
        }
        {
          name: 'Cors__AllowedOrigins__0'
          value: 'https://${webAppName}.azurewebsites.net'
        }
      ]
    }
  }
}

// Retorna a URL pública do Web App gerada pelo Azure após a implantação
output webAppUrl string = 'https://${webApp.properties.defaultHostName}'
