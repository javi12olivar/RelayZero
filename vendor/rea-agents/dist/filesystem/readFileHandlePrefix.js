/** Fill a positional prefix until its bound or true EOF, preserving caller cancellation errors. */
export const readFileHandlePrefix = async (handle, length, checkCancellation) => {
    const prefix = Buffer.alloc(length);
    let offset = 0;
    while (offset < length) {
        checkCancellation();
        // A rejected native read remains primary if cancellation arrived in flight.
        const { bytesRead } = await handle.read(prefix, offset, length - offset, offset);
        checkCancellation();
        if (bytesRead === 0)
            break;
        offset += bytesRead;
    }
    return prefix.subarray(0, offset);
};
