using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebServiceTreeModel.Models.Entity;
using WebServiceTreeModel.Service;

namespace WebServiceTreeModel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElectronicsController : ControllerBase
    {
        private readonly ElectronicsService _electronicsService;

        public ElectronicsController(ElectronicsService electronicsService) =>
            _electronicsService = electronicsService;

        [HttpGet]
        public async Task<List<Electronics>> Get() =>
            await _electronicsService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Electronics>> Get(string id)
        {
            var electronics = await _electronicsService.GetAsync(id);

            if (electronics is null)
            {
                return NotFound();
            }

            return electronics;
        }

        [HttpPost]
        public async Task<IActionResult> Add(Electronics newElectronics)
        {
            await _electronicsService.CreateAsync(newElectronics);

            return CreatedAtAction(nameof(Get), new { id = newElectronics.Id }, newElectronics);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Electronics updatedElectronics)
        {
            var electronics = await _electronicsService.GetAsync(id);

            if (electronics is null)
            {
                return NotFound();
            }

            updatedElectronics.Id = electronics.Id;

            await _electronicsService.UpdateAsync(id, updatedElectronics);

            //return NoContent();
            return CreatedAtAction(nameof(Get), new { id = updatedElectronics.Id }, updatedElectronics);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var electronics = await _electronicsService.GetAsync(id);

            if (electronics is null)
            {
                return NotFound();
            }

            await _electronicsService.RemoveAsync(id);

            return Ok(electronics);
            //return NoContent();

        }

        [HttpDelete("all/{id}")]
        public async Task<IActionResult> DeleteAll(string id)
        {
            var electronics = await _electronicsService.GetAsync(id);

            if (electronics is null)
            {
                return NotFound();
            }

            await _electronicsService.RemoveAllAsync(id);

            return Ok(electronics);
            //return NoContent();

        }
    }
}
