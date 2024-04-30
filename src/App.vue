<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Button from "primevue/button";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import Cookies from "js-cookie";
import {ref} from "vue";
import ConfirmDialog from 'primevue/confirmdialog';
import {useConfirm} from "primevue/useconfirm";
import Password from "primevue/password";
import Card from "primevue/card";


enum State {
  IN_GAME,
  MENU
}

function changeState() {
  switch (state) {
    case State.IN_GAME:
      state = State.MENU;
      break;
    case State.MENU:
      state = State.IN_GAME;
  }
  console.log(state);
}

function connect() {
  if (addr.value != '') {

  } else {
    console.log('server address is not specified')
    confirm_message = "Server Address is NOT specified";
    confirm_action();
  }
}

let confirm_message = "";
let state: State = State.MENU;

let addr = ref('');

let _int_ad = Cookies.get('addr')
if (typeof _int_ad != "undefined") {
  addr.value = _int_ad;
}
let dialog_confirmed = ref(false);
const confirm = useConfirm();

let password = ref('');

let _int_pwd = Cookies.get('password');
if (typeof _int_pwd != "undefined") {
  password.value = _int_pwd;
}
let username = ref('');

let _int_name = Cookies.get('username');
if (typeof _int_name != "undefined") {
  username.value = _int_name;
}

let password_valid = ref(true);

function confirm_action() {
  confirm.require({
        message: confirm_message,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'OK',
        accept: () => {
          dialog_confirmed.value = true;
        },
        reject: () => {
          dialog_confirmed.value = false;
        }
      }
  );
}

function save() {
  const okay = username_regex.test(username.value) && password_regex.test(password.value);
  if (okay) {
    Cookies.set('password', password.value);
    Cookies.set('username', username.value);
  } else {
    password_invalid_msg_visible.value = true;
  }
}

function reset() {
  Cookies.set('password', '');
  Cookies.set('username', '');

  username.value = '';
  password.value = '';
}

let account_success_msg_visible = ref(false);
let password_invalid_msg_visible = ref(false);
let post_reset_message_visible = ref(false);

const username_regex = new RegExp('^[a-zA-Z!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?]{5,30}$');
const password_regex = new RegExp('^[a-zA-Z!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?]{8,50}$');

function validate_password(password: string) {
  if (!password_regex.test(password)) {
    password_invalid_msg_visible.value = true;
  }
}
</script>

<template>
  <HelloWorld></HelloWorld>
  <div class="menu-div">
    <Button label="Switch State" @click="changeState()"></Button>
    <TabView>
      <TabPanel header="Server">
        <div class="flex flex-column gap-2">
          <div style="text-align: center">
            <h3>Details</h3>
            <h4>Username: {{ username }}</h4>
            <h4>Password: {{ password }}</h4>
          </div>
          <label for="addr">Enter the server address here:</label><br/>
          <InputText id="addr" v-model="addr"></InputText>
        </div>
        <div class="flex">
          <Button label="Connect to Server" @click="connect()"></Button>
          <ConfirmDialog></ConfirmDialog>
        </div>
      </TabPanel>
      <TabPanel header="Account">
        <div class="flex">
          <label for="username">Enter Your Username</label><br/>
          <InputText id="username" v-model="username"></InputText>
          <br/>
          <label for="password">Enter Your Password</label><br/>
          <Password v-model="password" toggle-mask :invalid="!password_valid" :feedback="false"
                    @update:modelValue="(value: string ) => validate_password(value)" id="password"></Password>
          <br/>
          <small v-if="account_success_msg_visible" class="note-txt">Successfully Saved Account Data</small>
          <small v-if="password_invalid_msg_visible" class="note-txt">Password or Username is invalid, must follow the
            regex below</small><br/>
          <small v-if="password_invalid_msg_visible" class="note-txt">Username:
            ^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,30}$</small><br/>
          <small v-if="password_invalid_msg_visible" class="note-txt">Password:
            ^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,30}$</small><br/>
        </div>
        <div class="flex">
          <Button @click="save()" label="Save" outlined></Button>
          <Button @click="reset()" label="Reset" severity="danger" outlined></Button>
        </div>
        <small v-if="post_reset_message_visible" class="note-txt">Successfully Reset</small>
      </TabPanel>
    </TabView>
  </div>
</template>

<style scoped>
.menu-div {
  text-align: center;
}

.note-txt {
  color: yellowgreen;
}
</style>
