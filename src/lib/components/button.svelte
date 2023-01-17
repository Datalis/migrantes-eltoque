<script lang="ts">
    export let type: 'solid' | 'bordered' = 'solid';
    export let color: 'accent' | 'light' | 'dark' = 'accent';
    export let classes = "";
</script>

<button class="btn btn-{type} btn-{color} {classes}">
    <slot></slot>
</button>

<style lang="css">
    .btn {
        appearance: none;
        border-radius: 4px;
        padding: 11.7px 12.8px 12.8px 13px;
        font-weight: 600;
        font-stretch: normal;
        line-height: 2.22;
        letter-spacing: normal;
        min-width: 200px;
        font-size: 12px;
    }

    .btn.btn-solid.btn-accent {
        background-color: #7856ff;
        color: #fffffd;
    }
    
    .btn.btn-bordered.btn-accent {
        border: 2px solid #7856ff;
    }
    .btn.btn-bordered.btn-light {
        border: 2px solid #fffffd;
    }
</style>