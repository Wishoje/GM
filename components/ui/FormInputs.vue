<template>
    <div class="c-form-input">
        <input class="c-form__input has-label-in"
            ref="theInput"
            :type="type"
            :name="field"
            :id="uniqueId"
            :placeholder="placeholder"
            :class="{
                    'label-is-up': !isMounted || Boolean(value) || hasError,
                    'c-form__input-error': showError
                }"
            :maxlength="maxlength"
            :required="required"
            v-model="localValue"
            @keyup.enter="onEnterKeyUp"
            @blur="onExit"
            @focus="$emit('onFocus')"
            @input="onInput"
            @change="onLazyInput" />

        <label :for="uniqueId"
            ref="theLabel"
            :class="{
                'c-form-label-in': !hideLabel,
                'c-form-error': showError
            }">
            <slot v-if="!showError"></slot>
            <span v-else>{{ errorMessage }}</span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'formInputs',
    props: {
        value: {
            required: true
        },
        // text|etc..
        type: {
            required: true,
            type: String
        },
        // "name" attribute
        field: {
            required: true,
            type: String
        },
        // if hideLabel is true
        placeholder: {
            type: String
        },
        maxlength: {
            default: 2000
        },
        required: {
            default: false,
            type: Boolean
        },
        trim: {
            default: true,
            type: Boolean
        },
        label: {
            type: String
        },
        hideLabel: {
            default: false,
            type: Boolean
        },
        validation: {
            type: Object
        },
        validateField: {
            type: Function
        }
    },
    data() {
        return {
            isMounted: false,
            // even if field is invalid, we hide error while user is typing
            isTyping: false
        };
    },
    computed: {
        localValue: {
            get() { return this.value; },
            set(val) { this.$emit('input', val); }
        },
        uniqueId() {
            const parentName = this.$parent.$options.name;
            return `${parentName.toLowerCase()}_${this.field}`;
        },
        hasError() {
            return this.validation ? this.validation.hasError(this.field) : false;
        },
        errorMessage() {
            return this.validation ? this.validation.firstError(this.field) : '';
        },
        showError() {
            return this.hasError && !this.isTyping;
        }
    },
    mounted() {
        this.isMounted = true;
        this.isTyping = false;

        if (this.required && this.$refs.theInput) {
            this.$refs.theInput.removeAttribute('required');
        }
    },
    methods: {
        onInput(e) {
            this.isTyping = true;
            const value = this.trim ? e.target.value.trim() : e.target.value;
            this.$emit('onInput', value);
        },
        onLazyInput(e) {
            this.isTyping = false;
            const val = this.localValue = this.trim ? e.target.value.trim() : e.target.value;
            this.$emit('onChange', val, this.field);
        },
        onExit(e) {
            this.isTyping = false;
            this.$emit('validateField', this.field);
            this.$emit('onBlur', this.field);
        },
        onEnterKeyUp() {
            this.$emit('onEnterKeyUp');
        }
    }
};
</script>