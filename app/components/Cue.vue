<template>
  <div class="cues">
    <div class="cue show" :class="item.mode" v-for="item, value in cues" @click="RemoveCue(item.id)">
      <div class="cue-head">
        <img class="cue-icon" v-if="item.icon" :src="item.icon">
        <b class="cue-title"> {{ item.title }}</b>
      </div>
      <div v-if="item.msg" class="cue-msg">
        {{ item.msg }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const cue = useCue()
const { cues } = cue
const RemoveCue = (id: string) => {
  cue.remove(id)
}
</script>

<style scoped>
.cues {
  width: 220px;
  font-size: .8em;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 0;
  z-index: 20
}

@media screen and (max-width:768px) {
  .cues {
    bottom: auto;
    top: 0;
  }
}

.cue {
  padding: 8px;
  margin: 8px;
  line-height: 1.2em;
  border: 2px solid var(--text);
  border-radius: var(--radius);
  background: var(--base);
  user-select: none;
  overflow-wrap: break-word;
}

.cue-head {
  display: flex;
  align-items: center;
}

.cue-title {
  white-space: pre-wrap;
}

.cue-icon {
  display: inline-block;
  min-width: 30px;
  margin-right: 5px;
}

.cue-msg {
  margin: 10px 5px 5px 0;
}

.done {
  border-color: var(--done);
}

.warn {
  border-color: var(--warn);
}

.error {
  border-color: var(--error);
}
</style>