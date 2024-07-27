<script setup>
    import { ref, onMounted } from 'vue';
    import { useMainStore } from "@/stores/main";
    
    const mainStore = useMainStore()

    const list = ref([])
    const getData = async () => {
        let res = await mainStore.getAllDiscussions()
        if (res.data) {
            console.log(res.data)
            list.value = res.data
            console.log(list.value)
        }
    }
    
    onMounted(() => {
        getData()
    })
</script>

<template>
    <div class="window">
        <div class="container">
            <div class="window__head">
                <div class="window__title">
                    Обсуждение продолжается
                </div>
            </div>

            <div class="window__body">
                <!-- <div class="window__filter">

                </div> -->

                <div class="window__table">
                    <table class="tg" style="table-layout: fixed; width: 100%">
                        <colgroup>
                            <col style="width: 50px;">
                            <col >
                            <col >
                            <col >
                            <col >
                            <col >
                            <col >
                            <col style="width: 50px;">
                        </colgroup>
                    <thead>
                    <tr style="background-color: #cfe9ff;">
                        <th class="tg-baqh"></th>
                        <th class="tg-baqh">Наименование проекта НПА</th>
                        <th class="tg-baqh">ID проекта</th>
                        <th class="tg-baqh">Разработчик проекта</th>
                        <th class="tg-baqh">Вид проекта НПА</th>
                        <th class="tg-baqh">Дата размещения</th>
                        <th class="tg-baqh">Дата окончания обсуждения</th>
                        <th class="tg-baqh"></th>
                    </tr></thead>
                    <tbody>
                    <tr style="background-color: #cfe9ff;">
                        <td class="tg-baqh"></td>
                        <td class="tg-0lax">
                            <div class="inp">
                                <input type="text">
                            </div>
                        </td>
                        <td class="tg-0lax">
                            <div class="inp">
                                <input type="text">
                            </div>
                        </td>
                        <td class="tg-0lax"><select name="cars" id="cars">
                            <option value="volvo">
                                Volvo
                            </option>
                            <option value="saab">
                                Saab
                            </option>
                            <option value="mercedes">
                                Mercedes
                            </option>
                            <option value="audi">
                                Audi
                            </option>
                            </select>
                        </td>
                        <td class="tg-0lax">
                            <div class="inp">
                                <input type="text">
                            </div>
                        </td>
                        <td class="tg-0lax"></td>
                        <td class="tg-0lax"></td>
                        <td class="tg-0lax"></td>
                    </tr>
                    <tr v-for="row, idx in list?.discussion" :key="idx">
                        <td class="tg-baqh">{{ idx+1 }}</td>
                        <td class="tg-0lax">
                            <router-link :to="`/single/${row?._id}`" class="link">
                                {{ row?.title }}
                            </router-link>
                        </td>
                        <td class="tg-0lax">{{ row?._id }}</td>
                        <td class="tg-0lax"></td>
                        <td class="tg-0lax"></td>
                        <td class="tg-0lax"></td>
                        <td class="tg-0lax"></td>
                        <td class="tg-0lax"></td>
                    </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/components/default/window';
</style>