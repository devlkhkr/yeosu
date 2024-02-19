<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      expand-separator
      icon="search"
      label="검색하기"
      class="text-grey-8"
    >
      <q-separator />
      <q-card class="bg-transparent">
        <q-card-section>
          <q-form>
            <div v-for="(item, index) in formOpions.items" :key="index">
              <q-input
                v-if="item.type === 'string'"
                :name="item.name"
                :type="item.type"
                v-model="refItemsModel[item.name]"
              >
                <template v-slot:prepend>
                  <span class="text-caption">{{ item.title }}</span>
                </template>
              </q-input>
              <q-select
                v-else-if="item.type === 'select'"
                v-model="refItemsModel[item.name]"
                :options="item.selectOptions"
              >
                <template v-slot:prepend>
                  <span class="text-caption">{{ item.selectTitle }}</span>
                </template>
              </q-select>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn
            unelevated
            color="primary"
            icon="search"
            class="full-width"
            @click="formOpions.onSearch(refItemsModel)"
            >검색</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>
<script setup lang="ts">
import { PropType, ref } from 'vue';

const props = defineProps({
  formOpions: {
    type: Object as PropType<IFSearchForm>,
    required: true,
  },
});
export interface FormItem {
  name: string;
  title: string;
  type: string;
  selectTitle?: string;
  selectOptions?: {
    label: string;
    value: string | number | null;
  }[];
}

const itemModelGen = () => {
  let returnObj: {
    [key: string]: string | number | null;
  } = {};
  for (let i = 0; i < props.formOpions.items.length; i++) {
    let item = props.formOpions.items[i];
    returnObj[item.name] = null;
  }
  return returnObj;
};
const refItemsModel = ref(itemModelGen());

export interface IFSearchForm {
  items: FormItem[];
  onSearch: (refItemsModel: { [key: string]: string | number | null }) => void;
}
</script>
