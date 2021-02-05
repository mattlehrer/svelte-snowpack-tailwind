<script>
  import Amplify, { Auth } from "aws-amplify";
  import { onMount } from "svelte";
  import config from "./aws-exports";

  $: formState = {
    username: "",
    password: "",
    authCode: "",
    formType: "signUp",
  };

  async function signUp() {
    await Auth.signUp({
      username: formState.username,
      password: formState.password,
    });
    formState.formType = "confirmSignUp";
  }

  async function confirmSignUp() {
    await Auth.confirmSignUp(formState.username, formState.authCode);
  }

  async function signIn() {
    await Auth.signIn(formState.username, formState.password);
    formState.formType = "signedIn";
  }

  onMount(() => {
    Amplify.configure(config);
  });
</script>

<style>
  input {
    @apply shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md;
  }
</style>

<div class="">
  <h1>Welcome</h1>
  {#if formState?.formType === "signUp"}
    <div>
      <input
        name="email"
        bind:value="{formState.username}"
        placeholder="email"
      />
      <input
        name="password"
        type="password"
        bind:value="{formState.password}"
        placeholder="password"
      />
      <button on:click="{signUp}">Sign Up</button>
      <button on:click="{signIn}">Sign In</button>
    </div>
  {:else if formState?.formType === "confirmSignUp"}
    <div>
      <input
        name="authCode"
        bind:value="{formState.authCode}"
        placeholder="Confirmation Code"
      />
      <button on:click="{confirmSignUp}">Confirm Sign Up</button>
    </div>
  {:else if formState?.formType === "signIn"}
    <div>
      <input
        name="email"
        bind:value="{formState.username}"
        placeholder="email"
      />
      <input
        name="password"
        type="password"
        bind:value="{formState.password}"
        placeholder="password"
      />
      <button on:click="{signIn}">Sign In</button>
    </div>
  {:else if formState?.formType === "signedIn"}
    <div>
      <h2>You are signed in</h2>
    </div>
  {:else}
    <h2>Loading</h2>
    JSON.stringify(formState, null, 2)
  {/if}
</div>
