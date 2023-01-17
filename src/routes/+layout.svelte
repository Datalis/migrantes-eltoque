<script>
    import Button from "$lib/components/button.svelte";
import "../app.css";
</script>
<slot></slot>
<footer class="bg-accent">
    <div class="max-w-3xl py-20 mx-auto">
        <div></div>
        <div class="flex flex-col md:flex-row items-center">
            <div class="flex flex-col flex-1 mb-10 md:mb-0">
                <span class="text-gray">Coordinación editorial: Jessica Dominguez Delgado</span>
                <span class="text-gray">Compilación y análisis de datos: -</span>
                <span class="text-gray">Coordinación de Marketing: Roberto Pablo</span>
                <span class="text-gray">Diseño: Janet Aguilar</span>
                <span class="text-gray">Programación: Datalis</span>
            </div>
            <Button type='bordered' color="light" classes="text-light">Descarga la base de datos</Button>
        </div>
    </div>
</footer>