## Brief overview
This rule defines automatic memory bank update procedures for the PLC Simulator project when context is running low. It ensures comprehensive documentation maintenance without manual intervention.

## Context monitoring thresholds
- Monitor context window usage percentage regularly
- Trigger updates when usage exceeds 70% of available tokens
- Consider project complexity when determining update frequency
- Track recent changes and new discoveries that need documentation

## Update triggers and procedures
- Initiate memory bank review when context usage reaches critical levels
- Start with activeContext.md to capture current work focus
- Update progress.md to reflect completed and pending tasks
- Review systemPatterns.md for architectural consistency
- Verify techContext.md for technical accuracy
- Ensure projectbrief.md and productContext.md remain aligned with current goals

## Prioritization for memory bank updates
- ActiveContext.md: Highest priority - captures current work state
- Progress.md: Second priority - tracks what's completed and remaining
- SystemPatterns.md: Third priority - documents architectural decisions
- TechContext.md: Fourth priority - maintains technical specifications
- ProjectBrief.md and ProductContext.md: Lower priority - update when major scope changes occur

## Fallback mechanisms
- If context is severely limited, focus only on activeContext.md and progress.md
- Use concise but comprehensive documentation style
- Prioritize recent changes over historical information
- Include key technical decisions and implementation details
- Document any unresolved issues or next steps clearly

## Communication style
- Use clear, technical language appropriate for engineering documentation
- Maintain consistent formatting with existing memory bank files
- Include specific examples when they clarify complex concepts
- Focus on factual information rather than conversational tone

## Development workflow
- Read all memory bank files before starting any significant work
- Update documentation after completing major milestones
- Verify documentation accuracy before finalizing changes
- Maintain version control compatibility with git operations
