/** Check a schema-validated nonnegative byte range against its carrier size. */
export const insideArtifact = (fileBytes) => ({ offset, bytes, }) => offset <= fileBytes - bytes;
