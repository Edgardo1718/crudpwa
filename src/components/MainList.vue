

<template>
    <div class="bg-gray-200 min-h-screen">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Notas</h2>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    type="button"
                    @click="showAddTaskModal = true">
                +
            </button>
           
        </div>

        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div v-for="(task, taskId) in taskList" class="group relative">
                <div class="mt-4 flex justify-between shadow-md rounded-lg p-4 bg-white flex-col">
    <div style="flex: 1;">
        <img v-if="task.photo" :src="task.photo" alt="Foto de la tarea" class="w-full h-auto rounded-md mb-2" />
        <div class="flex justify-between items-start">
            <div>
                <h2 class="text-lg font-bold text-gray-700">{{ task.title }}</h2>
                <p class="mt-1 text-sm text-gray-500 w-full">{{ task.description }}</p>
            </div>
            <p class="text-sm font-medium" :class="{
                'text-gray-900': task.status === 'Other',
                'text-green-500': task.status === 'Complete',
                'text-yellow-500': task.status === 'Review',
                'text-red-500': task.status === 'Panding',
            }">
                {{ task.status }}
            </p>
        </div>
    </div>
    <div class="flex justify-center mt-auto">
        <div class="flex space-x-2">
            <button @click="openDeleteModal(taskId)" class="text-red-500"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <button @click="openEditModal(taskId)" class="text-blue-500"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        </div>
    </div>
</div>

            </div>
        </div>
    </div>
    <AddTask v-if=showAddTaskModal @cancel="showAddTaskModal = false" @submitted="showAddTaskModal = false">
            </AddTask>
            <EditTask v-if=showEditTaskModal @cancel="showEditTaskModal = false" @submitted="showEditTaskModal = false"
                :edit-id="editId"></EditTask>
            <DeleteModal v-if="showDeleteModal" @cancel="showDeleteModal = false" @deleted="showDeleteModal = false"
                :delete-id="deleteId" />
</div>

</template>

<script >
// import ref from 'vue'
import AddTask from '../components/AddTask.vue'
import EditTask from '../components/EditTask.vue'
import DeleteModal from './DeleteModal.vue'; // Import the DeleteModal component
import { getDatabase, ref, onValue } from "firebase/database";
export default {
    name: 'MainList',
    components: {
        AddTask,
        EditTask,
        DeleteModal
    },


    data() {
        return {
            showDeleteModal: false,
            showAddTaskModal: false,
            showEditTaskModal: false,
            deleteId: 0,
            editId: 0,
            taskList: []
        }
    },
    async mounted() {
        const firebaseDB = getDatabase();

        const firebaseRef = ref(firebaseDB, 'tasks/');
        onValue(firebaseRef, (snapshot) => {
            const data = snapshot.val();
            this.taskList = data
        })
    },
    
    methods: {
        openDeleteModal(id) {
            this.deleteId = id
            this.showDeleteModal = true
        },
        openEditModal(id) {
            this.editId = id
            this.showEditTaskModal = true
        }
    }
}

</script>