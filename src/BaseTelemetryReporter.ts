import type { Disposable } from 'vscode'
import type TelemetryReporter from '@vscode/extension-telemetry'
import type {
    TelemetryEventProperties,
    TelemetryEventMeasurements
} from '@vscode/extension-telemetry'

/**
 * Base Telemetry reporter providing an interface to send telemetry events
 */
export class BaseTelemetryReporter {
    protected static reporter: TelemetryReporter | undefined

    static ensureToBeConfigured () {
        if (!this.reporter) {
            throw new Error('TelemetryReporter was not configured, call "TelemetryReporter.configure(context)" first!')
        }
    }

    /**
	 * An event that is fired when the telemetry level is changed
	 */
    static onDidChangeTelemetryLevel (listener: (ev: 'all' | 'error' | 'crash' | 'off', thisArgs?: any, disposables?: Disposable[]) => any) {
        return this.reporter!.onDidChangeTelemetryLevel(listener)
    }

    /**
     * Sends a telemetry event with the given properties and measurements
     * Properties are sanitized on best-effort basis to remove sensitive data prior to sending.
     * @param eventName The name of the event
     * @param properties The set of properties to add to the event in the form of a string key value pair
     * @param measurements The set of measurements to add to the event in the form of a string key  number value pair
     */
    static sendTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements) {
        this.ensureToBeConfigured()
        this.reporter!.sendTelemetryEvent(eventName, properties, measurements)
    }

    /**
     * Sends a raw (unsanitized) telemetry event with the given properties and measurements
     * @param eventName The name of the event
     * @param properties The set of properties to add to the event in the form of a string key value pair
     * @param measurements The set of measurements to add to the event in the form of a string key  number value pair
     */
    static sendRawTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements) {
        this.ensureToBeConfigured()
        this.reporter!.sendRawTelemetryEvent(eventName, properties, measurements)
    }

    /**
     * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry event without checking telemetry setting
     * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
     * @param eventName The name of the event
     * @param properties The properties to send with the event
     * @param measurements The measurements (numeric values) to send with the event
     */
    static sendDangerousTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements) {
        this.ensureToBeConfigured()
        this.reporter!.sendDangerousTelemetryEvent(eventName, properties, measurements)
    }

    /**
     * Sends a telemetry error event with the given properties, measurements.
     * **Note**: The errorProps parameter has been removed since v0.6, if you would like to remove a property please use the replacementOptions parameter in the constructor.
     * @param eventName The name of the event
     * @param properties The set of properties to add to the event in the form of a string key value pair
     * @param measurements The set of measurements to add to the event in the form of a string key  number value pair
     */
    static sendTelemetryErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements) {
        this.ensureToBeConfigured()
        this.reporter!.sendTelemetryErrorEvent(eventName, properties, measurements)
    }

    /**
     * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry error event without checking telemetry setting
     * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
     * @param eventName The name of the event
     * @param properties The properties to send with the event
     * @param measurements The measurements (numeric values) to send with the event
     */
    static sendDangerousTelemetryErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements) {
        this.ensureToBeConfigured()
        this.reporter!.sendDangerousTelemetryErrorEvent(eventName, properties, measurements)
    }
}
