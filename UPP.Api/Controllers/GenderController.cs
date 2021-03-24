using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;
using UPP.Model;

namespace UPP.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenderController : ControllerBase
    {
        private readonly DbEntites _context;

        public GenderController(DbEntites context)
        {
            _context = context;
        }

        // GET: api/Genders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenderDTO>>> GetGender()
        {
            var gender = await _context.Genders.Select(c => new GenderDTO
            {
                GenderId = c.GenderId,
                GenderCode = c.GenderCode,
                GenderDesc = c.GenderDesc
            }).ToListAsync().ConfigureAwait(false);

            return gender;
        }

        // GET: api/Genders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GenderDTO>> GetGender(int id)
        {
            var gender = await _context.Genders.FindAsync(id).ConfigureAwait(false);
            var genderDto = new GenderDTO();

            if (gender == null)
            {
                return NotFound();
            }
            genderDto.InjectFrom(gender);
            return genderDto;
        }

        // PUT: api/Genders/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGender(int id, Gender gender)
        {
            if (id != gender.GenderId)
            {
                return BadRequest();
            }

            _context.Entry(gender).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GenderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Genders
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<GenderDTO>> PostGender(GenderDTO genderDto)
        {
            try
            {
                var gender = new Gender();
                gender.InjectFrom(genderDto);

                _context.Genders.Add(gender);
                await _context.SaveChangesAsync().ConfigureAwait(false);

                return CreatedAtAction("GetGender", new { id = gender.GenderId }, gender);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // DELETE: api/Genders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Gender>> DeleteGender(int id)
        {
            var gender = await _context.Genders.FindAsync(id).ConfigureAwait(false);
            if (gender == null)
            {
                return NotFound();
            }

            _context.Genders.Remove(gender);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return gender;
        }

        private bool GenderExists(int id)
        {
            return _context.Genders.Any(e => e.GenderId == id);
        }
    }
}
