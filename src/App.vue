<script  setup>
  //consola
  import { ref,computed ,watch} from 'vue';
  import  Header  from './components/Header.vue'
  import  Button  from './components/Button.vue'
  import { calculateTotalPay } from './helpers';

  const quantity = ref(10000);
  const months = ref(6);
  const total = ref(0);

  const MAX = 20000;
  const MIN = 0;
  const STEP = 100;

  //API de formato dinero
  const formatMoney = (value) => {
    const formatter = new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD'
    });

    //acceder al valor
    return formatter.format(value);
  };

  watch([quantity,months] , () => {
    total.value = calculateTotalPay(quantity.value,months.value)
  })

  //pago mensual
  const payMonths = computed(() => {
    return total.value / months.value
  })

  //Funcion del decremento
  const handleChangeDecrement = () => {
    if(quantity.value <= MIN){
      alert('Cantidad no valida')
      return
    }

    quantity.value = quantity.value - STEP
  }

  //Funcion del incremento
  const handleChangeIncrement = () => {
    if(quantity.value >= MAX){
      alert('Cantidad no valida')
      return
    }

    quantity.value = quantity.value + STEP
  }

</script>

<template>
  <!-- pantalla -->
   <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header/>

      <div class="flex justify-between mt-10">
        <Button
          :operator="'-'"
          :fn="handleChangeDecrement"
        />

        <Button
          :operator="'+'"
          :fn="handleChangeIncrement"
        />
      </div>
      <div class="my-5">
        <input 
          type="range"
          class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
          :min="MIN"
          :max="MAX"
          :step="STEP"
          v-model.number="quantity"
        >
        <p class="text-center my-10 text-5xl font-extrabold text-blue-600">{{ formatMoney(quantity) }}</p>

        <h2 class="text-center text-2xl font-extrabold text-gray-600"> 
            Elige un <span class="text-blue-700"> plazo </span>  a pagar
        </h2>

        <select 
          class="w-full mt-5 p-2 bg-white border border-gray-300 rounded-lg text-xl font-bold text-gray-600 text-center"
          :value="months"
          v-model.number="months"
          >
          <option value="6">6 Months</option>
          <option value="12">12 Months</option>
          <option value="24">24 Months</option>
        </select>

        <div v-if="total>0" class="my-5 space-y-3 bg-gray-100 p-5 rounded-lg">
          <h2 class="text-2xl font-extrabold text-gray-500 text-center">
            Resumen <span class="text-blue-600"> de pagos</span>
          </h2>
          <p class="text-xl text-gray-500 text-center font-bold"> {{ months }} Meses:</p>
          <p class="text-xl text-gray-500 text-center font-bold"> Total a pagar: {{ formatMoney(total) }} </p>
          <p class="text-xl text-gray-500 text-center font-bold">Mensuales: {{ formatMoney(payMonths) }}</p>
        </div>
      </div>
   </div>
</template>

