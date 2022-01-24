type Feature = "Catalog" | "MultipleCatalogs"
type FeatureStatus = boolean

export const featureFlags: Record<Feature, FeatureStatus> = {
  Catalog: true,
  MultipleCatalogs: true, // added with new markets; when false, defaults to the asheville catalog
}
