using EmployeeBackend.Entities;

namespace EmployeeBackend.Dtos
{
    public class CreateEmployeeDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int? DepartmentId { get; set; }
    }
}
