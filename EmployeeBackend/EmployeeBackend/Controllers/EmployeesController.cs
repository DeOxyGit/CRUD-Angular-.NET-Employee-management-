using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeBackend.Data;
using EmployeeBackend.Entities;
using EmployeeBackend.Dtos;

namespace EmployeeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            try
            {
                var data = await _context.Employees.Include(t => t.Department).ToListAsync();
                if (!data.Any())
                {
                    return NotFound("Not Found data in database");
                }
                return Ok(data);

            }catch(Exception ex)
            {
                return StatusCode(500, $"Error in EmployeeController get method: {ex.Message}");
            }
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            try
            {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
            }catch (Exception ex)
            {
                return StatusCode(500, $"Error in EmployeeController getById method: {ex.Message}");
            }
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, UpdateEmployeeDto dto)
        {
            try
            {
            var check = await _context.Employees.AnyAsync(t => t.Id == id);
            if(check == null)
            {
                return NotFound($"Id {id} is not found in database");
            }
            var em = await _context.Employees.FindAsync(id);
            if(em == null)
            {
                return NotFound($"Failed to update");
                }
            em.FirstName = dto.FirstName ?? em.FirstName;
            em.LastName = dto.LastName ?? em.LastName;
            em.DepartmentId = dto.DepartmentId ?? em.DepartmentId;

            await _context.SaveChangesAsync();

            return NoContent();

            }catch (Exception ex)
            {
                return StatusCode(500, $"Error in EmployeeController put method: {ex.Message}");
            }
        }

        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CreateEmployeeDto>> PostEmployee(CreateEmployeeDto dto)
        {
            try
            {
                var newData = new Employee
                {
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    DepartmentId = dto.DepartmentId
                };
                _context.Employees.Add(newData);
                await _context.SaveChangesAsync();

                return Ok(dto);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error in EmployeeController getById method: {ex.Message}");
            }
        }


        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound($"Sorry Employee id : {id}");
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
