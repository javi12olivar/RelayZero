/** Record one attestation's checks, preserving compared values and source locations. */
export const createLoadImageChecks = () => {
    const checks = [];
    const check = (name, expected, observed, fileOffset = null, location = null) => {
        checks.push({
            name,
            matched: JSON.stringify(expected) === JSON.stringify(observed),
            expected,
            observed,
            file_offset: fileOffset,
            address: location,
        });
    };
    return { checks, check };
};
