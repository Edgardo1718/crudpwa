<template>

<div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4 md:p-0">
    <div class="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 bg-white shadow-lg rounded-md p-4">
        <h2 class="text-2xl font-bold mb-8">Editar tarea</h2>
        <form>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Titulo</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title" type="text" v-model="title" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Descripcion</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description" type="text" v-model="description" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Añadir una imagen</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description" type="text" v-model="foto" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="selectedOption">
                    Estado
                </label>
                <select class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    id="selectedOption" v-model="status">
                    <option value="" disabled>Selecciona el estado de la tarea</option>
                    <option value="Complete">Completada</option>
                    <option value="Panding">Pendiente</option>
                    <option value="Review">Revision</option>
                    <option value="Other">Otro</option>
                </select>
            </div>
            <div class="mb-6 mt-6 text-center">
                <button class="bg-blue-500 mr-4 hover:bg-blue-700 text-white mt-5 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button" @click="submitForm">
                    Editar
                </button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button" @click="cancelForm">
                    Cancelar
                </button>
            </div>
        </form>
    </div>
</div>

</template>
  
<script>
import { getDatabase, ref, onValue, set } from "firebase/database";
export default {
    data() {
        return {
            title: '',
            description: '',
            status: '',
            foto:''
        };
    },
    mounted(){
        const firebaseDB = getDatabase();

        const firebaseRef = ref(firebaseDB, 'tasks/' + this.editId);
        onValue(firebaseRef, (snapshot) => {
            const data = snapshot.val();
            this.title = data.title
            this.description = data.description
            this.status = data.status
            this.foto=data.photo
         })
    },
    methods: {
        cancelForm() {
            this.$emit('cancel');
        },
        submitForm() {
            const firebaseDB = getDatabase();

            const firebaseRef = ref(firebaseDB, 'tasks/' + this.editId);
            const data = {
                title: this.title,
                description: this.description,
                status: this.status,
                photo:this.foto
            }
            set(firebaseRef, data)

            this.$emit('submitted');
        },
        
    },
    props: {
        editId: String
    }
};
</script>