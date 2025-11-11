import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import RHLayout from "@/layouts/RHLayout.vue";
import CongesRH from "@/views/rh/CongesRH.vue";
import PaieRH from "@/views/rh/PaieRH.vue";
import DocumentsRH from "@/views/rh/DocumentsRH.vue";
import EvaluationRH from "@/views/rh/EvaluationRH.vue";
import MessagesRH from "@/views/rh/MessagesRH.vue";
import ParametresRH from "@/views/rh/ParametresRH.vue";
import DashboardRH from "@/views/rh/DashboardRH.vue";
import DepartmentDetail from "@/views/rh/DepartmentDetail.vue";
import RapportsRH from "@/views/rh/RapportsRH.vue";
import PersonnelComponent from "@/views/rh/PersonnelComponent.vue";
import PresenceList from "@/views/PresenceList.vue";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/dashboard',
    component: RHLayout,
    children: [
      { path: '', name: 'DashboardRH', component: DashboardRH }, // ✅ page par défaut
      { path: 'documents', component: DocumentsRH },
      { path: 'evaluations', component: EvaluationRH },
      { path: 'messages', component: MessagesRH },
      { path: 'parametres', component: ParametresRH },
      { path: 'personnel', component: PersonnelComponent },
      { path: 'presence', component: PresenceList },
      { path: 'conges', component: CongesRH },
      { path: 'paie', component: PaieRH },
      { path: 'departements/:id', component: DepartmentDetail, props: true },
      { path: 'rapports', component: RapportsRH },
      { path: 'paie', component: PaieRH },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/', // ✅ redirige toute route inconnue vers la page de login
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken')

  if (to.path.startsWith('/dashboard') && !isAuthenticated) {
    next('/') 
  } else {
    next()
  }
})

export default router;
