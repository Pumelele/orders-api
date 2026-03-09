function mapOrderPayload(body) {
  const numeroPedido = String(body.numeroPedido ?? "");
  const orderId = numeroPedido.includes("-") ? numeroPedido.split("-")[0] : numeroPedido;

  return{
    orderId,
    value: Number(body.valorTotal),
    creationDate: new Date(body.dataCriacao),
    items: Array.isArray(body.items)
      ? body.items.map((i) => ({
          productId: Number(i.idItem),
          quantity: Number(i.quantidadeItem),
          price: Number(i.valorItem),
        }))
      : [],
  };
}

module.exports = { mapOrderPayload };