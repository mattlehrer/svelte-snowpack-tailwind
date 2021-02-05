<script>
  import Amplify, { Auth } from "aws-amplify";
  import { onMount } from "svelte";
  import config from "./aws-exports";

  $: formState = {
    username: "",
    email: "",
    password: "",
    authCode: "",
    formType: "signUp",
  };

  async function signUp() {
    const response = await Auth.signUp({
      username: formState.username,
      password: formState.password,
      attributes: {
        email: formState.email,
      },
    });
    formState.formType = "confirmSignUp";
    console.log({ response });
  }

  async function confirmSignUp() {
    const response = await Auth.confirmSignUp(
      formState.username,
      formState.authCode,
    );
    formState.formType = "signIn";
    console.log({ response });
  }

  async function signIn() {
    const response = await Auth.signIn(formState.username, formState.password);
    formState.formType = "signedIn";
    console.log({ response });
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
        name="username"
        bind:value="{formState.username}"
        placeholder="username"
      />
      <input name="email" bind:value="{formState.email}" placeholder="email" />
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
