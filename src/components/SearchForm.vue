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
                v-model="refItemsModel[item.name].value"
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
                  <span class="text-caption">{{ item.title }}</span>
                </template>
              </q-select>
              <div v-else-if="item.type === 'period'">
                <q-field borderless>
                  <template v-slot:prepend>
                    <span class="text-caption">{{ item.title }}</span>
                  </template>
                  <div class="flex items-center no-wrap" style="gap: 8px">
                    <q-input
                      v-model="refItemsModel[item.name].start"
                      mask="date"
                      :rules="['date']"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="xs"
                          class="cursor-pointer"
                          color="grey-5"
                        >
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="refItemsModel[item.name].start">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="확인"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                    <i class="text-grey">~</i>
                    <q-input
                      v-model="refItemsModel[item.name].end"
                      mask="date"
                      :rules="['date']"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="event"
                          size="xs"
                          class="cursor-pointer"
                          color="grey-5"
                        >
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="refItemsModel[item.name].end">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="확인"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </q-field>
              </div>
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
  selectOptions?: {
    label: string;
    value: string | number | null;
  }[];
}

export interface ItemValues {
  value?: string | number | null;
  label?: string | null;
  start?: string | null;
  end?: string | null;
}
export interface ItemModels {
  [key: string]: ItemValues;
}

const itemModelGen = () => {
  let returnObj: ItemModels = {};
  for (let i = 0; i < props.formOpions.items.length; i++) {
    let item = props.formOpions.items[i];

    if (item.type === 'period') {
      returnObj[item.name] = {
        start: null,
        end: null,
      };
    } else if (item.type === 'select') {
      returnObj[item.name] = {
        label: item.selectOptions ? item.selectOptions[0].label : '',
        value: item.selectOptions ? item.selectOptions[0].value : '',
      };
    } else {
      returnObj[item.name] = {
        value: null,
      };
    }
  }
  return returnObj;
};
const refItemsModel = ref<ItemModels>(itemModelGen());

export interface IFSearchForm {
  items: FormItem[];
  onSearch: (refItemsModel: ItemModels) => void;
}
</script>
