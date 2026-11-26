import { MavenGradleMetadataService } from "../application/java/MavenGradleMetadataService.js";
import { MavenGradleMetadataProvider } from "../java/MavenGradleMetadataProvider.js";
/** Compose bundled Maven POM and Gradle module metadata inspection without Maven or Gradle. */
export const createMavenGradleMetadataService = () => {
    const provider = new MavenGradleMetadataProvider();
    return new MavenGradleMetadataService(provider);
};
