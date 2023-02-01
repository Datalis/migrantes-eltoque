<script>

</script>

<div>
    <form action="post">
        <label>
            Nombre del desaparecido
            <input type="text" required>
        </label>
        <label>
            Nombre del denunciante
            <input type="text" required>
        </label>
        <div class="flex">
            <label>
                Email
                <input type="email" name="email" id="email" required>
            </label>
            <label>
                Teléfono
                <input type="tel">
            </label>
        </div>
        <label>
            Mensaje
            <textarea name="message" id="message" cols="30" rows="10" required></textarea>
        </label>
        <button type="submit">Enviar</button>
    </form>
</div>

<style>
    input, textarea {
        border: 1px solid white;
    }
</style>