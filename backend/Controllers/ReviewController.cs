using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Mappers;
using backend.Dtos.Review;

namespace backend.Controllers
{
  [Route("api/reviews")]
  public class ReviewController(IReviewRepository reviewRepo) : ControllerBase
  {
    private readonly IReviewRepository _reviewRepo = reviewRepo;

    [HttpGet("location/{locationId}")]
    public async Task<IActionResult> GetReviewsForLocation([FromRoute] int locationId)
    {
      var reviews = await _reviewRepo.GetReviewsByLocationIdAsync(locationId);
      var reviewsDto = reviews.Select(x => x.ToReviewDto());
      return Ok(reviewsDto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      var review = await _reviewRepo.GetReviewByIdAsync(id);
      if (review == null)
        return NotFound();
      var reviewDto = review.ToReviewDto();
      return Ok(reviewDto);
    }
    [HttpPost]
    public async Task<IActionResult> CreateReview([FromBody] CreateReviewDto createReviewDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      try 
      {
        var createdReview = await _reviewRepo.AddReviewAsync(createReviewDto.ToReviewFromCreateDto());
        return CreatedAtAction(nameof(GetById), new { id = createdReview.Id }, createdReview.ToReviewDto());
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(ex.Message);
      }
      catch (Exception ex)
      {
        return StatusCode(500, "An error occurred while creating the review");
      }
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReview([FromRoute] int id)
    {
      var deletedReview = await _reviewRepo.DeleteReviewAsync(id);
      return deletedReview != null ? NoContent() : NotFound();
    }
  }
}
