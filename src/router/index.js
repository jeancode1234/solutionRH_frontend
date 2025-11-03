import { createRouter, createWebHistory } from "vue-router";

// === Import des vues ===
import LoginView from "@/views/auth/LoginView.vue";
import DashboardAdmin from "@/views/admin/DashboardAdmin.vue";
import ChatView from "@/views/chat/ChatView.vue";
//Employee Imports
import EmployeeLayout from "@/layouts/EmployeeLayout.vue";
import DashboardEmployee from "@/views/employee/DashboardEmployee.vue";
import ProfilEmployee from "@/views/employee/ProfilEmployee.vue";
import CongesEmployee from "@/views/employee/CongesEmployee.vue";
import FormationsEmployee from "@/views/employee/FormationsEmployee.vue";
import TachesEmployee from "@/views/employee/TachesEmployee.vue";
import PaieEmployee from "@/views/employee/PaieEmployee.vue";
import MessagesEmployee from "@/views/employee/MessagesEmployee.vue";


//Chef Imports
import DashboardChef from "@/views/chef/DashboardChef.vue";
import ChefLayout from "@/layouts/ChefLayout.vue";
//RH Imports
import RHLayout from "@/layouts/RHLayout.vue";
import PresencesRH from "@/views/rh/PresencesRH.vue";
import CongesRH from "@/views/rh/CongesRH.vue";
import PaieRH from "@/views/rh/PaieRH.vue";
import DocumentsRH from "@/views/rh/DocumentsRH.vue";
import EvaluationRH from "@/views/rh/EvaluationRH.vue";
import MessagesRH from "@/views/rh/MessagesRH.vue";
import ParametresRH from "@/views/rh/ParametresRH.vue";
import DashboardRH from "@/views/rh/DashboardRH.vue";
import DepartmentDetail from "@/views/rh/DepartmentDetail.vue";
import DepartementRH from "@/views/rh/DepartmentsRH.vue";
import CongesChef from "@/views/chef/CongesChef.vue";
import EquipeChef from "@/views/chef/EquipeChef.vue";
import EvaluationsChef from "@/views/chef/EvaluationsChef.vue";
import MessagesChef from "@/views/chef/MessagesChef.vue";
import TachesChef from "@/views/chef/TachesChef.vue";
import RapportChef from "@/views/chef/RapportChef.vue";
import RapportsRH from "@/views/rh/RapportsRH.vue";
import RapportsEmployee from "@/views/employee/RapportsEmployee.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/admin",
    component: DashboardAdmin,
    name: "dashboard-admin",
  },
  {
    path: "/rh",
    component: RHLayout,
    children: [
      { path: "dashboard", component: DashboardRH },
      { path: "documents", component: DocumentsRH },
      { path: "evaluations", component: EvaluationRH },
      { path: "messages", component: MessagesRH },
      { path: "parametres", component: ParametresRH },
      { path: "presences", component: PresencesRH },
      { path: "conges", component: CongesRH },
      { path: "departements", component: DepartementRH },
      { path: "departements/:id", component: DepartmentDetail, props: true },
      { path: "evaluations", component: EvaluationRH },
      { path: "rapports", component: RapportsRH },
      { path: "paie", component: PaieRH },
    ],
  },
  {
    path: "/employee",
    component: EmployeeLayout,
    children: [
      {
        path: "dashboard",
        name: "DashboardEmployee",
        component: DashboardEmployee,
      },
      {
        path: "profil",
        name: "ProfilEmployee",
        component: ProfilEmployee,
      },
      {
        path: "conges",
        name: "CongesEmployee",
        component: CongesEmployee,
      },
      {
        path: "formations",
        name: "FormationsEmployee",
        component: FormationsEmployee,
      },
      {
        path: "taches",
        name: "TachesEmployee",
        component: TachesEmployee,
      },
      {
        path: "rapports",
        name: "RapportsEmployee",
        component: RapportsEmployee,
      },
      {
        path: "paie",
        name: "PaieEmployee",
        component: PaieEmployee,
      },
      {
        path: "messages",
        name: "MessagesEmployee",
        component: MessagesEmployee,
      },
    ],
  },
  {
    path: "/chef",
    component: ChefLayout,
    children: [
      {
        path: "dashboard",
        name: "dashboard-chef",
        component: DashboardChef,
      },
      {
        path: "conges",
        name: "conges-chef",
        component: CongesChef,
      },
      {
        path: "equipe",
        name: "equipes-chef",
        component: EquipeChef,
      },
      {
        path:"evaluations",
        name:"evaluations-chef",
        component: EvaluationsChef,
      },
      {
        path: "taches",
        name: "taches-chef",
        component: TachesChef,
      },
      {
        path: "rapports",
        name: "rapport-chef",
        component: RapportChef,
      },
      {
        path: "messages",
        name: "messages-chef",
        component: MessagesChef,
      }
    ],
  },
  // { path: '/chef', name: 'ChefDashboard', component: DashboardChef },
  {
    path: "/chat",
    name: "chat",
    component: ChatView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
