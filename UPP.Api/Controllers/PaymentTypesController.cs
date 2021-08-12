using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Omu.ValueInjecter;
using UPP.Api.Model;
using UPP.Api.Model.DTO;
using UPP.Model;

namespace UPP.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentTypesController : ControllerBase
    {
        private readonly DbEntites _context;
        private IHostEnvironment _hostEnvironment;


        public PaymentTypesController(DbEntites context,IHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        // GET: api/PaymentTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentTypesDTO>>> GetPaymentTypes()
        {
            var paymentTypesDto = new List<PaymentTypesDTO>();
            try
            {
                paymentTypesDto = await _context.PaymentTypes.Select(c => new PaymentTypesDTO
                {
                    PaymentTypesId = c.PaymentTypesId,
                    PaymentTypesDesc = c.PaymentTypesDesc,
                    Active = c.Active
                }).ToListAsync().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in the GetPaymentTypes method");
            }
            return paymentTypesDto;
        }

        // GET: api/PaymentTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentTypesDTO>> GetPaymentTypes(int id)
        {
            var paymentTypesDto = new PaymentTypesDTO();
            try
            {
                var paymentTypes = id != 0 ? await _context.PaymentTypes.FindAsync(id).ConfigureAwait(false) : await _context.PaymentTypes.FirstOrDefaultAsync().ConfigureAwait(false);

                if (paymentTypes == null)
                {
                    return NotFound();
                }

                paymentTypesDto.InjectFrom(paymentTypes);
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in the GetPaymentType method");
            }


            return paymentTypesDto;
        }

        // PUT: api/PaymentTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentTypes(int id, PaymentTypesDTO paymentTypesDto)
        {
            if (id != paymentTypesDto.PaymentTypesId)
            {
                return BadRequest();
            }
            
            //_context.Entry(paymentTypes).State = EntityState.Modified;
            try
            {
                var paymentTypes = await _context.PaymentTypes.FirstOrDefaultAsync(c => c.PaymentTypesId == id).ConfigureAwait(false);
                paymentTypes.PaymentTypesDesc = paymentTypesDto.PaymentTypesDesc;
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!PaymentTypesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                    System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in the PostPaymentTyeps method");
                }
            }

            return NoContent();
        }

        // POST: api/PaymentTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaymentTypes>> PostPaymentTypes(PaymentTypesDTO paymentTypesDto)
        {
            var paymentTypes = new PaymentTypes();
            try
            {
                paymentTypes.InjectFrom(paymentTypesDto);

                _context.PaymentTypes.Add(paymentTypes);
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in the PostPaymentTyeps method");

            }

            return CreatedAtAction("GetPaymentTypes", new { id = paymentTypes.PaymentTypesId }, paymentTypes);
        }

        // DELETE: api/PaymentTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentTypes(int id)
        {
            var paymentTypes = await _context.PaymentTypes.FindAsync(id).ConfigureAwait(false);
            if (paymentTypes == null)
            {
                return NotFound();
            }

            _context.PaymentTypes.Remove(paymentTypes);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return NoContent();
        }

        private bool PaymentTypesExists(int id)
        {
            return _context.PaymentTypes.Any(e => e.PaymentTypesId == id);
        }
    }
}
