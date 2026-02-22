<script lang="ts">
  import { Motion } from "svelte-motion";

  export let text: string = "";
  export let duration = 0.3;
  let _class: string = "";
  export { _class as class };
</script>

<div class="text-wrapper">
  {#each text.split(" ") as word, index}
    <Motion
      initial={{ opacity: 0, filter: "blur(4px)", rotateX: 90, y: 5 }}
      transition={{
        ease: "easeOut",
        duration: duration,
        delay: index * 0.08,
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        rotateX: 0,
        y: 0,
      }}
      let:motion
    >
      <span use:motion class="word {_class}">{word}</span>
    </Motion>
  {/each}
</div>

<style>
  .text-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3em;
    justify-content: center;
  }

  .word {
    display: inline-block;
    background: linear-gradient(to right, #acacac, #363636, #acacac);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: text-gradient 4s linear infinite;
  }

  @keyframes text-gradient {
    from { background-position: 0% center; }
    to { background-position: 200% center; }
  }
</style>
