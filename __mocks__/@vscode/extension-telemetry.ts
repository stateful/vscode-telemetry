export default class ExtensionTelemetryReporter {
    constructor (
        public extensionId: string,
        public version: string,
        public key: string
    ) {}
}
