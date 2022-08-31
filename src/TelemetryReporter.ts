import vscode from 'vscode'
import OriginalTelemetryReporter, { TelemetryEventProperties, RawTelemetryEventProperties, TelemetryEventMeasurements } from '@vscode/extension-telemetry'

export class TelemetryReporter {
    static #reporter: OriginalTelemetryReporter | undefined

    static #ensureToBeConfigured () {
        if (!this.#reporter) {
            throw new Error('TelemetryReporter was not configured, call "TelemetryReporter.configure(context)" first!')
        }
    }

    /**
     * Sends a telemetry event with the given properties and measurements
     * Properties are sanitized on best-effort basis to remove sensitive data prior to sending.
     * @param eventName The name of the event
     * @param properties The set of properties to add to the event in the form of a string key value pair
     * @param measurements The set of measurements to add to the event in the form of a string key  number value pair
     */
    static sendEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements) {
        this.#ensureToBeConfigured()
        this.#reporter!.sendTelemetryEvent(eventName, properties, measurements)
    }

    /**
     * Sends a raw (unsanitized) telemetry event with the given properties and measurements
     * @param eventName The name of the event
     * @param properties The set of properties to add to the event in the form of a string key value pair
     * @param measurements The set of measurements to add to the event in the form of a string key  number value pair
     */
    static sendRawEvent(eventName: string, properties?: RawTelemetryEventProperties, measurements?: TelemetryEventMeasurements) {
        this.#ensureToBeConfigured()
        this.#reporter!.sendRawTelemetryEvent(eventName, properties, measurements)
    }

    /**
     * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry event without checking telemetry setting
     * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
     * @param eventName The name of the event
     * @param properties The properties to send with the event
     * @param measurements The measurements (numeric values) to send with the event
     * @param sanitize Whether or not to sanitize to the properties and measures, defaults to true
     */
    static sendDangerousEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, sanitize?: boolean) {
        this.#ensureToBeConfigured()
        this.#reporter!.sendDangerousTelemetryEvent(eventName, properties, measurements, sanitize)
    }

    /**
     * Sends a telemetry error event with the given properties, measurements.
     * **Note**: The errorProps parameter has been removed since v0.6, if you would like to remove a property please use the replacementOptions parameter in the constructor.
     * @param eventName The name of the event
     * @param properties The set of properties to add to the event in the form of a string key value pair
     * @param measurements The set of measurements to add to the event in the form of a string key  number value pair
     */
    static sendErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements) {
        this.#ensureToBeConfigured()
        this.#reporter!.sendTelemetryErrorEvent(eventName, properties, measurements)
    }

    /**
     * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry error event without checking telemetry setting
     * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
     * @param eventName The name of the event
     * @param properties The properties to send with the event
     * @param measurements The measurements (numeric values) to send with the event
     * @param sanitize Whether or not to run the properties and measures through sanitiziation, defaults to true
     */
    static sendDangerousErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, sanitize?: boolean) {
        this.#ensureToBeConfigured()
        this.#reporter!.sendDangerousTelemetryErrorEvent(eventName, properties, measurements, sanitize)
    }

    /**
     * Sends an exception which includes the error stack, properties, and measurements
     * @param error The error to send
     * @param properties The set of properties to add to the event in the form of a string key value pair
     * @param measurements The set of measurements to add to the event in the form of a string key  number value pair
     */
    static sendException(error: Error, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements) {
        this.#ensureToBeConfigured()
        this.#reporter!.sendTelemetryException(error, properties, measurements)
    }

    /**
     * **DANGEROUS** Given an error, properties, and measurements. Sends an exception event without checking the telemetry setting
     * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
     * @param eventName The name of the event
     * @param properties The properties to send with the event
     * @param measurements The measurements (numeric values) to send with the event
     * @param sanitize Whether or not to sanitize to the properties and measures, defaults to true
     */
    static sendDangerousException(error: Error, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, sanitize?: boolean) {
        this.#ensureToBeConfigured()
        this.#reporter!.sendDangerousTelemetryException(error, properties, measurements, sanitize)
    }

    static configure (context: vscode.ExtensionContext, key: string) {
        const { name, publisher, version } = context.extension.packageJSON
        const extensionId = `${publisher}.${name}`
        this.#reporter = new OriginalTelemetryReporter(extensionId, version, key)
        return this.#reporter
    }
}
