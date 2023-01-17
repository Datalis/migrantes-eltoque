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
        border-radius: 5px;
        padding: 10px 12px;
        font-weight: 600;
        font-stretch: normal;
        line-height: 2.22;
        letter-spacing: normal;
        min-width: 200px;
        font-size: 12px;
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .btn.btn-solid.btn-accent {
        background-color: #7856ff;
        border: 2px solid #7856ff;
        color: #fffffd;
    }
    
    .btn.btn-solid.btn-accent:hover {
        background-color: #412C90;
        border-color: #412C90;
    }

    .btn.btn-bordered.btn-accent {
        border: 2px solid #7856ff;
        color: #7856ff;
    }
    .btn.btn-bordered.btn-accent:hover {
        background-color: #7856ff;
        color: #fffffd;
    }

    .btn.btn-bordered.btn-light {
        border: 2px solid #fffffd;
    }
    .btn.btn-bordered.btn-light:hover {
        background-color: #fffffd;
        color: #7856ff;
    }
</style>