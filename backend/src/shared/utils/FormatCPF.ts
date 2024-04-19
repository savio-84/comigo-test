export function formatCPF(cpf: string) {
  // Remover caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');

  // Aplicar a máscara do CPF (formato: 000.000.000-00)
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  return cpf;
}