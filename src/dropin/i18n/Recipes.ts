import { i18nData, i18nSchema } from "../core/Formats/Models/i18n"
import { NameArticle, RecipeType } from "../core"
import * as i18nRecipeTypes from "."

export const i18nRecipes = i18nData({

  name: {
    en: { one: "Recipe", many: "Recipes" },
    fr: { one: "Recette", many: "Recettes", article: NameArticle.FR_FEM },
  },

  getRecipeTypeName: (type: RecipeType): i18nSchema => {
    switch(type) {
      case RecipeType.COLLECTION: return i18nRecipeTypes.i18nCollections.name
      case RecipeType.COMPANY: return i18nRecipeTypes.i18nCompanies.name
      case RecipeType.CONFIG: return i18nRecipeTypes.i18nConfigs.name
      case RecipeType.CONNECTOR: return i18nRecipeTypes.i18nConnectors.name
      case RecipeType.DATABASE: return i18nRecipeTypes.i18nDatabases.name
      case RecipeType.DEPLOYMENT: return i18nRecipeTypes.i18nDeployments.name
      case RecipeType.DOCKER_REGISTRY: return i18nRecipeTypes.i18nDockerRegistries.name
      case RecipeType.DOCUMENT: return i18nRecipeTypes.i18nDocuments.name
      case RecipeType.EVOLUTION: return i18nRecipeTypes.i18nEvolutions.name
      case RecipeType.FORM: return i18nRecipeTypes.i18nForms.name
      case RecipeType.GIT_REPOSITORY: return i18nRecipeTypes.i18nGitRepositories.name
      case RecipeType.GROUP: return i18nRecipeTypes.i18nGroups.name
      case RecipeType.HOSTNAME: return i18nRecipeTypes.i18nHostnames.name
      case RecipeType.LOGS: return i18nRecipeTypes.i18nLogs.name
      case RecipeType.MAP: return i18nRecipeTypes.i18nMaps.name
      case RecipeType.METRIC: return i18nRecipeTypes.i18nMetrics.name
      case RecipeType.MIGRATION: return i18nRecipeTypes.i18nMigrations.name
      case RecipeType.MILESTONE: return i18nRecipeTypes.i18nMilestones.name
      case RecipeType.NAMESPACE: return i18nRecipeTypes.i18nNamespaces.name
      case RecipeType.OPERATION: return i18nRecipeTypes.i18nOperations.name
      case RecipeType.PERMISSION: return i18nRecipeTypes.i18nPermissions.name
      case RecipeType.PIPELINE: return i18nRecipeTypes.i18nPipelines.name
      case RecipeType.PROJECT: return i18nRecipeTypes.i18nProjects.name
      case RecipeType.RECIPE: return i18nRecipeTypes.i18nRecipes.name
      case RecipeType.SECTION: return i18nRecipeTypes.i18nSections.name
      case RecipeType.TOKEN: return i18nRecipeTypes.i18nTokens.name
      case RecipeType.USER: return i18nRecipeTypes.i18nUsers.name
      case RecipeType.VALUES: return i18nRecipeTypes.i18nValues.name
      case RecipeType.VERSION: return i18nRecipeTypes.i18nVersions.name
      case RecipeType.VISUALIZATION: return i18nRecipeTypes.i18nVisualizations.name
      case RecipeType.VOLUME: return i18nRecipeTypes.i18nVolumes.name
    }
  },

})
