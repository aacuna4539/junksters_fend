import {BootstrapFormValidationRenderer} from './bootstap-form-validation-renderer';

export function configure(config) {
    config.globalResources([]);
    config.container
        .registerHandler(
            'bootstrap-form',
            container => container.get(BootstrapFormValidationRenderer));
}
