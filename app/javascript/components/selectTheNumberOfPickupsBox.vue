<template>
  <div
    id="select-the-number-of-pickups"
    class="form-group col-6 mx-auto text-center my-3"
  >
    <label for="select-pickup-number">ピックアップ数選択</label>
    <select
      id="select-pickup-number"
      :value="selectedPickupNumber"
      class="form-control text-center"
      @input="$emit('input', Number($event.target.value))"
    >
      <option
        v-for="(selectTheNumber, index) in selectTheNumberOfPickups"
        :key="index"
        :value="selectTheNumber.value"
      >
        {{ selectTheNumber.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    selectedPickupNumber: {
      type: Number,
      required: true,
    },
    selectTheNumberOfPickups: {
      type: Array,
      required: true,
    }
  }
};
</script>