<template>
    <label class="c-checkbox" :class="{'c-checkbox--center': alignCenter, 'c-form-checkbox-error': showError}">
        <input type="checkbox" class="c-invisible-input"
            :disabled="disabled"
            :name="field"
            v-model="localValue"/>
        <span class="c-checkbox-hide is-focus"></span>
        <slot></slot>
    </label>
</template>

<script>
export default {
    name: 'Checkbox',
    props: {
        value: {
            type: Boolean,
            required: true
        },
        field: {
            required: true,
            type: String
        },
        required: {
            default: false,
            type: Boolean
        },
        validation: {
            type: Object
        },
        alignCenter: Boolean,
        disabled: Boolean
    },
    computed: {
        hasError() {
            return this.validation ? this.validation.hasError(this.field) : false;
        },
        errorMessage() {
            return this.validation ? this.validation.firstError(this.field) : '';
        },
        showError() {
            return this.hasError;
        },
        localValue: {
            get() { return this.value; },
            set(val) { this.$emit('input', val); }
        }
    }
};
</script>
